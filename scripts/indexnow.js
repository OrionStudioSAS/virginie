/**
 * indexnow.js
 * Post-build (production Vercel uniquement) : signale à Bing/IndexNow les URLs
 * ajoutées, modifiées ou supprimées depuis le dernier déploiement.
 * Ne fait jamais échouer le build.
 *
 * Usage : node scripts/indexnow.js            (auto, via npm run build)
 *         node scripts/indexnow.js --all      (soumet toutes les URLs du sitemap)
 *         node scripts/indexnow.js --dry-run  (affiche les URLs sans les envoyer)
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const HOST = 'www.virginie-lelong-nutrition.fr';
const BASE_URL = `https://${HOST}`;
const KEY = '6075da98ac2d17239de47162ac15db7e';

const submitAll = process.argv.includes('--all');
const dryRun = process.argv.includes('--dry-run');

function slugOf(file) {
  // Fichier supprimé : le nom de fichier est le slug (cf. api/publish.ts)
  const full = path.join(ROOT, file);
  if (!fs.existsSync(full)) return path.basename(file, '.md');
  const m = fs.readFileSync(full, 'utf-8').match(/^slug:\s*["']?([^"'\n]+)/m);
  return m ? m[1].trim() : path.basename(file, '.md');
}

function sitemapUrls() {
  const xml = fs.readFileSync(path.join(ROOT, 'public', 'sitemap.xml'), 'utf-8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

function changedUrls() {
  const prev = process.env.VERCEL_GIT_PREVIOUS_SHA;
  if (!prev) return null;
  let files;
  try {
    files = execSync(`git diff --name-only ${prev} HEAD`, { cwd: ROOT, encoding: 'utf-8' })
      .split('\n').filter(Boolean);
  } catch {
    return null; // historique trop court (clone superficiel) → repli
  }

  const urls = new Set();
  for (const f of files) {
    if (/^posts\/.+\.md$/.test(f)) urls.add(`${BASE_URL}/blog/${slugOf(f)}`);
    else if (/^news\/.+\.md$/.test(f)) urls.add(`${BASE_URL}/actualites/${slugOf(f)}`);
    else if (f === 'constants.tsx' || /^components\//.test(f)) urls.add(`${BASE_URL}/`);
    else if (/^public\/.+\.html$/.test(f)) urls.add(`${BASE_URL}/${path.basename(f)}`);
  }
  if ([...urls].some((u) => u.includes('/blog/') || u.includes('/actualites/'))) {
    urls.add(`${BASE_URL}/blog-et-actualites`);
  }
  return [...urls];
}

async function main() {
  if (!submitAll && !dryRun && process.env.VERCEL_ENV !== 'production') {
    console.log('ℹ️  IndexNow : ignoré (pas un déploiement de production)');
    return;
  }

  const urls = submitAll ? sitemapUrls() : (changedUrls() ?? sitemapUrls());
  if (urls.length === 0) {
    console.log('ℹ️  IndexNow : aucune page modifiée');
    return;
  }

  if (dryRun) {
    console.log(`IndexNow (dry-run) : ${urls.length} URL(s)`);
    urls.forEach((u) => console.log(`   ${u}`));
    return;
  }

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `${BASE_URL}/${KEY}.txt`,
      urlList: urls,
    }),
  });
  console.log(`✅ IndexNow : ${urls.length} URL(s) soumise(s) → HTTP ${res.status}`);
  urls.forEach((u) => console.log(`   ${u}`));
}

main().catch((err) => console.warn(`⚠️  IndexNow : échec (${err.message}) — build non bloqué`));
