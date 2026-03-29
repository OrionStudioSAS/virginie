/**
 * Script généré automatiquement à chaque build.
 * Crée :
 *  - public/sitemap.xml  (URLs statiques + tous les articles du blog)
 *  - public/rss.xml      (flux RSS des 20 derniers articles)
 *
 * Usage : node scripts/generate-seo.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'posts');
const NEWS_DIR = path.join(ROOT, 'news');
const PUBLIC_DIR = path.join(ROOT, 'public');
const BASE_URL = 'https://www.virginie-lelong-nutrition.fr';
const TODAY = new Date().toISOString().split('T')[0];

/* ─── Parser frontmatter ──────────────────────────────────────────────────── */
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const data = {};
  match[1].split('\n').forEach((line) => {
    const idx = line.indexOf(':');
    if (idx > 0) {
      const key = line.slice(0, idx).trim();
      const val = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
      data[key] = val;
    }
  });

  return { data, content: match[2] };
}

/* ─── Lecture des articles ────────────────────────────────────────────────── */
function getPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
      const { data } = parseFrontmatter(raw);
      return {
        slug:    data.slug    || file.replace('.md', ''),
        title:   data.title   || 'Sans titre',
        date:    data.date    || TODAY,
        excerpt: data.excerpt || '',
        image:   data.image   || '',
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/* ─── Lecture des actualités ─────────────────────────────────────────────── */
function getNews() {
  if (!fs.existsSync(NEWS_DIR)) return [];
  return fs
    .readdirSync(NEWS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(NEWS_DIR, file), 'utf-8');
      const { data } = parseFrontmatter(raw);
      return {
        slug:    data.slug    || file.replace('.md', ''),
        title:   data.title   || 'Sans titre',
        date:    data.date    || TODAY,
        excerpt: data.excerpt || '',
        image:   data.image   || '',
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/* ─── URLs statiques (admin EXCLUE) ─────────────────────────────────────── */
const STATIC_URLS = [
  { loc: `${BASE_URL}/`,                                   lastmod: '2025-11-26', changefreq: 'weekly',  priority: '1.0' },
  { loc: `${BASE_URL}/blog-et-actualites`,                  lastmod: TODAY,        changefreq: 'weekly',  priority: '0.9' },
  { loc: `${BASE_URL}/mentions-legales.html`,              lastmod: '2025-11-26', changefreq: 'yearly',  priority: '0.3' },
  { loc: `${BASE_URL}/politique-confidentialite.html`,     lastmod: '2025-11-26', changefreq: 'yearly',  priority: '0.3' },
  { loc: `${BASE_URL}/#about`,                             lastmod: '2025-11-26', changefreq: 'monthly', priority: '0.9' },
  { loc: `${BASE_URL}/#locations`,                         lastmod: '2025-11-26', changefreq: 'monthly', priority: '0.9' },
  { loc: `${BASE_URL}/#impedance`,                         lastmod: '2025-11-26', changefreq: 'monthly', priority: '0.8' },
  { loc: `${BASE_URL}/#pricing`,                          lastmod: '2025-11-26', changefreq: 'monthly', priority: '0.7' },
  { loc: `${BASE_URL}/#testimonials`,                     lastmod: '2025-11-26', changefreq: 'monthly', priority: '0.6' },
  { loc: `${BASE_URL}/#faq`,                              lastmod: '2025-11-26', changefreq: 'monthly', priority: '0.7' },
  { loc: `${BASE_URL}/#contact`,                          lastmod: '2025-11-26', changefreq: 'monthly', priority: '0.8' },
];

/* ─── Générateur sitemap ─────────────────────────────────────────────────── */
function generateSitemap(posts) {
  const postUrls = posts.map((p) => ({
    loc: `${BASE_URL}/blog/${p.slug}`,
    lastmod: p.date,
    changefreq: 'monthly',
    priority: '0.7',
  }));

  const urlBlocks = [...STATIC_URLS, ...postUrls]
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

${urlBlocks}

</urlset>`;
}

/* ─── Générateur RSS ─────────────────────────────────────────────────────── */
function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function generateRss(posts) {
  const items = posts
    .slice(0, 20)
    .map((p) => {
      const pubDate = new Date(p.date).toUTCString();
      const imageTag = p.image
        ? `\n      <enclosure url="${escapeXml(p.image)}" type="image/jpeg" length="0" />`
        : '';
      return `  <item>
    <title><![CDATA[${p.title}]]></title>
    <link>${BASE_URL}/blog/${p.slug}</link>
    <guid isPermaLink="true">${BASE_URL}/blog/${p.slug}</guid>
    <pubDate>${pubDate}</pubDate>
    <description><![CDATA[${p.excerpt}]]></description>${imageTag}
  </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Blog – Virginie Lelong, Diététicienne</title>
    <link>${BASE_URL}/blog</link>
    <description>Conseils nutrition, astuces bien-être et actualités du cabinet de Virginie Lelong, diététicienne nutritionniste à Melun et Corbeil-Essonnes.</description>
    <language>fr-FR</language>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>contact@virginie-lelong-nutrition.fr (Virginie Lelong)</managingEditor>
    <image>
      <url>${BASE_URL}/assets/logo.jpeg</url>
      <title>Virginie Lelong Diététicienne</title>
      <link>${BASE_URL}</link>
    </image>
${items}
  </channel>
</rss>`;
}

/* ─── Main ───────────────────────────────────────────────────────────────── */
const posts = getPosts();
const newsItems = getNews();

// Sitemap : blog + actualités
function generateSitemapFull(posts, news) {
  const postUrls = posts.map((p) => ({
    loc: `${BASE_URL}/blog/${p.slug}`, lastmod: p.date, changefreq: 'monthly', priority: '0.7',
  }));
  const newsUrls = news.map((n) => ({
    loc: `${BASE_URL}/actualites/${n.slug}`, lastmod: n.date, changefreq: 'weekly', priority: '0.8',
  }));
  const urlBlocks = [...STATIC_URLS, ...postUrls, ...newsUrls]
    .map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n\n${urlBlocks}\n\n</urlset>`;
}

fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), generateSitemapFull(posts, newsItems), 'utf-8');
console.log(`✅ sitemap.xml — ${STATIC_URLS.length + posts.length + newsItems.length} URLs (${posts.length} articles, ${newsItems.length} actualités)`);

fs.writeFileSync(path.join(PUBLIC_DIR, 'rss.xml'), generateRss(posts), 'utf-8');
console.log(`✅ rss.xml — ${Math.min(posts.length, 20)} articles`);
