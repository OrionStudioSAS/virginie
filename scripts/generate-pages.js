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
import { marked } from 'marked';
import { loadConstants, homepageJsonLd, articleJsonLd, llmsTxt } from './site-data.js';

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
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { content: raw };
  const data = {};
  match[1].split('\n').forEach(line => {
    const idx = line.indexOf(':');
    if (idx < 1) return;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
    data[key] = val;
  });
  data.content = match[2];
  return data;
}

function absUrl(url) {
  if (!url) return null;
  return /^https?:\/\//.test(url) ? url : `${BASE_URL}${url}`;
}

function jsonLdScript(data) {
  // JSON-LD laissé en place côté client (react-helmet-async n'en génère pas)
  return `\n  <script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}

const AUTHOR_BOX = `
      <aside class="mt-10 p-6 bg-white rounded-2xl border border-slate-100">
        <p><strong>Écrit par Virginie Lelong - Mazaud</strong>, diététicienne-nutritionniste diplômée d'État à Melun et Corbeil-Essonnes.</p>
        <p><a href="/">Découvrir le cabinet</a> · <a href="https://www.doctolib.fr/dieteticien/corbeil-essonnes/virginie-lelong-mazaud">Prendre rendez-vous sur Doctolib</a></p>
      </aside>`;

function injectSeo(template, { title, description, canonical, ogImage, ogType = 'website', h1, excerpt, body, noIndex = false, jsonLd, authorBox = false }) {
  const fullTitle = escHtml(`${title} | Virginie Lelong Diététicienne`);
  const desc      = escHtml(description || '');
  const url       = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
  const img       = absUrl(ogImage) || DEFAULT_OG;
  const h1safe    = escHtml(h1 || title);
  const excSafe   = escHtml(excerpt || description || '');

  // data-prerender : retirées par index.tsx au chargement de React (évite les doublons avec react-helmet-async)
  const head = noIndex ? `
  <!-- SEO statique pré-rendu (generate-pages.js) -->
  <title data-prerender>${fullTitle}</title>
  <meta data-prerender name="robots" content="noindex">
  <!-- fin SEO statique -->` : `
  <!-- SEO statique pré-rendu (generate-pages.js) -->
  <title data-prerender>${fullTitle}</title>
  <meta data-prerender name="description" content="${desc}">
  <link data-prerender rel="canonical" href="${url}">
  <meta data-prerender property="og:title" content="${fullTitle}">
  <meta data-prerender property="og:description" content="${desc}">
  <meta data-prerender property="og:type" content="${ogType}">
  <meta data-prerender property="og:url" content="${url}">
  <meta data-prerender property="og:image" content="${escHtml(img)}">
  <meta data-prerender property="og:locale" content="fr_FR">
  <!-- fin SEO statique -->${jsonLd ? jsonLdScript(jsonLd) : ''}`;

  // Contenu lisible sans JS (Bing, réseaux sociaux, IA…) ; React le remplace au montage
  const prerendered = `
    <article class="container mx-auto px-6 max-w-3xl pt-32 pb-24">
      <h1 class="text-3xl md:text-5xl font-serif font-bold text-slate-800 mb-6 leading-tight">${h1safe}</h1>
      ${excSafe ? `<p class="text-lg text-slate-500 mb-10 font-light leading-relaxed">${excSafe}</p>` : ''}
      ${body ? `<div class="article-content">${body}</div>` : ''}${authorBox ? AUTHOR_BOX : ''}
    </article>`;

  return template
    .replace('</head>', head + '\n</head>')
    .replace('<div id="root"></div>', `<div id="root">${prerendered}</div>`);
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

const constants = await loadConstants();

function readEntries(dir, urlPrefix, section) {
  return mdFiles(dir)
    .map((file) => parseFrontmatter(fs.readFileSync(path.join(dir, file), 'utf-8')))
    .filter((data) => data.slug)
    .map((data) => ({
      ...data,
      section,
      path: `${urlPrefix}/${data.slug}`,
      url:  `${BASE_URL}${urlPrefix}/${data.slug}`,
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

const posts = readEntries(POSTS, '/blog', 'Blog');
const news  = readEntries(NEWS, '/actualites', 'Actualités');
const llms  = llmsTxt(constants, posts, news);

// 1. Homepage (mise à jour in-place)
writePage(path.join(DIST, 'index.html'), {
  title:       constants.SEO_TITLE,
  description: constants.SEO_DESCRIPTION,
  canonical:   '/',
  ogType:      'website',
  h1:          `${constants.APROPOS_NOM} — Diététicienne Nutritionniste`,
  excerpt:     constants.SEO_DESCRIPTION,
  body:        marked.parse(llms.replace(/^# .*\n/, '')),
  jsonLd:      homepageJsonLd(constants),
});
console.log('✅  /  (homepage)');

// 2. Blog & Actualités
writePage(path.join(DIST, 'blog-et-actualites', 'index.html'), {
  title:       constants.SEO_BLOG_TITLE,
  description: constants.SEO_BLOG_DESCRIPTION,
  canonical:   '/blog-et-actualites',
  ogType:      'website',
  h1:          'Blog & Actualités',
  excerpt:     'Conseils nutrition, recettes et actualités du cabinet diététique.',
  body:        marked.parse([...posts, ...news]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((e) => `- [${e.title}](${e.path}) — ${e.excerpt}`)
    .join('\n')),
});
console.log('✅  /blog-et-actualites');

// 3. Articles de blog et actualités
for (const entry of [...posts, ...news]) {
  const image = absUrl(entry.image);
  writePage(path.join(DIST, entry.path, 'index.html'), {
    title:       entry.title   || '',
    description: entry.excerpt || '',
    canonical:   entry.path,
    ogImage:     image,
    ogType:      'article',
    h1:          entry.title   || '',
    excerpt:     entry.excerpt || '',
    body:        marked.parse(entry.content || ''),
    jsonLd:      articleJsonLd({ ...entry, image }),
    authorBox:   true,
  });
}
console.log(`✅  /blog/* (${posts.length} articles), /actualites/* (${news.length} actualités)`);

// 4. llms.txt (résumé du site pour les assistants IA)
fs.writeFileSync(path.join(DIST, 'llms.txt'), llms, 'utf-8');
console.log('✅  /llms.txt');

// 5. Page 404 (servie avec un vrai statut 404 par vercel.json)
writePage(path.join(DIST, '404.html'), {
  title:   'Page introuvable',
  h1:      'Page introuvable',
  excerpt: "La page que vous cherchez n'existe pas ou a été déplacée.",
  noIndex: true,
});
console.log('✅  /404.html');

console.log('\n🎉 Pages statiques générées — les crawlers voient désormais les balises SEO.');
