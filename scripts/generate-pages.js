/**
 * generate-pages.js
 * Post-build script : génère un index.html statique avec les balises SEO
 * pour chaque route connue (homepage, blog-et-actualites, chaque article/actu).
 * Vercel sert ces fichiers statiques en priorité sur les rewrites → les
 * crawlers reçoivent un HTML avec <title>, <meta description> et <h1> renseignés.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST  = path.join(__dirname, '../dist');
const POSTS = path.join(__dirname, '../posts');
const NEWS  = path.join(__dirname, '../news');
const BASE_URL = 'https://www.virginie-lelong-nutrition.fr';
const DEFAULT_OG = `${BASE_URL}/assets/og-image.jpg`;

// ─── helpers ─────────────────────────────────────────────────────────────────

function escHtml(str = '') {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const data = {};
  match[1].split('\n').forEach(line => {
    const idx = line.indexOf(':');
    if (idx < 1) return;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
    data[key] = val;
  });
  return data;
}

function injectSeo(template, { title, description, canonical, ogImage, ogType = 'website', h1, excerpt }) {
  const fullTitle = escHtml(`${title} | Virginie Lelong Diététicienne`);
  const desc      = escHtml(description || '');
  const url       = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
  const img       = ogImage || DEFAULT_OG;
  const h1safe    = escHtml(h1 || title);
  const excSafe   = escHtml(excerpt || description || '');

  const head = `
  <!-- SEO statique pré-rendu (generate-pages.js) -->
  <title>${fullTitle}</title>
  <meta name="description" content="${desc}">
  <link rel="canonical" href="${url}">
  <meta property="og:title" content="${fullTitle}">
  <meta property="og:description" content="${desc}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${escHtml(img)}">
  <meta property="og:locale" content="fr_FR">
  <!-- fin SEO statique -->`;

  // Contenu minimal lisible par les crawlers sans JS
  const noscript = `
  <noscript>
    <article style="font-family:sans-serif;max-width:800px;margin:2rem auto;padding:1rem">
      <h1>${h1safe}</h1>
      ${excSafe ? `<p>${excSafe}</p>` : ''}
    </article>
  </noscript>`;

  return template
    .replace('</head>', head + '\n</head>')
    .replace('<div id="root"></div>', '<div id="root"></div>' + noscript);
}

// Lire le template une seule fois AVANT toute modification
const TEMPLATE = fs.readFileSync(path.join(DIST, 'index.html'), 'utf-8');

function writePage(destPath, meta) {
  const html = injectSeo(TEMPLATE, meta);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, html, 'utf-8');
}

function mdFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith('.md'));
}

// ─── routes ──────────────────────────────────────────────────────────────────

// 1. Homepage (mise à jour in-place)
writePage(path.join(DIST, 'index.html'), {
  title:       'Virginie Lelong - Diététicienne Nutritionniste à Melun',
  description: 'Diététicienne nutritionniste diplômée à Melun et Corbeil-Essonnes. Perte de poids, diabète, chirurgie bariatrique, nutrition du sport.',
  canonical:   '/',
  ogType:      'website',
  h1:          'Virginie Lelong Mazaud — Diététicienne Nutritionniste',
  excerpt:     'Cabinet à Melun, Corbeil-Essonnes et Fontainebleau. Bilan personnalisé, impédancemétrie, suivi nutritionnel bienveillant.',
});
console.log('✅  /  (homepage)');

// 2. Blog & Actualités
writePage(path.join(DIST, 'blog-et-actualites', 'index.html'), {
  title:       'Blog & Actualités – Nutrition et Diététique',
  description: 'Articles de nutrition, conseils diététiques et actualités du cabinet de Virginie Lelong Mazaud, diététicienne nutritionniste.',
  canonical:   '/blog-et-actualites',
  ogType:      'website',
  h1:          'Blog & Actualités',
  excerpt:     'Conseils nutrition, recettes et actualités du cabinet diététique.',
});
console.log('✅  /blog-et-actualites');

// 3. Articles de blog
let blogCount = 0;
for (const file of mdFiles(POSTS)) {
  const raw  = fs.readFileSync(path.join(POSTS, file), 'utf-8');
  const data = parseFrontmatter(raw);
  if (!data.slug) continue;
  const ogImage = data.image ? `${BASE_URL}${data.image}` : null;
  writePage(path.join(DIST, 'blog', data.slug, 'index.html'), {
    title:       data.title   || '',
    description: data.excerpt || '',
    canonical:   `/blog/${data.slug}`,
    ogImage,
    ogType:      'article',
    h1:          data.title   || '',
    excerpt:     data.excerpt || '',
  });
  blogCount++;
}
console.log(`✅  /blog/* (${blogCount} articles)`);

// 4. Actualités
let newsCount = 0;
for (const file of mdFiles(NEWS)) {
  const raw  = fs.readFileSync(path.join(NEWS, file), 'utf-8');
  const data = parseFrontmatter(raw);
  if (!data.slug) continue;
  const ogImage = data.image ? `${BASE_URL}${data.image}` : null;
  writePage(path.join(DIST, 'actualites', data.slug, 'index.html'), {
    title:       data.title   || '',
    description: data.excerpt || '',
    canonical:   `/actualites/${data.slug}`,
    ogImage,
    ogType:      'article',
    h1:          data.title   || '',
    excerpt:     data.excerpt || '',
  });
  newsCount++;
}
console.log(`✅  /actualites/* (${newsCount} actualités)`);

console.log('\n🎉 Pages statiques générées — les crawlers voient désormais les balises SEO.');
