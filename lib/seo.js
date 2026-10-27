/**
 * Règles SEO partagées entre le site (React) et les scripts de build (Node).
 */

import { marked } from 'marked';

const MAX_TITLE = 70; // au-delà, Bing/Google tronquent le titre
const SUFFIXES = [' | Virginie Lelong Diététicienne', ' | Virginie Lelong'];

const len = (s) => Array.from(s).length;

/* Titre de la balise <title> : suffixe le plus long qui tient en 70 caractères, sinon titre coupé au dernier mot */
export function seoTitle(title) {
  const clean = title.replace(/\p{Extended_Pictographic}️?/gu, '').replace(/\s+/g, ' ').trim();
  if (clean.includes('Virginie Lelong')) return clean;

  for (const suffix of SUFFIXES) {
    if (len(clean + suffix) <= MAX_TITLE) return clean + suffix;
  }
  if (len(clean) <= MAX_TITLE) return clean;

  const cut = Array.from(clean).slice(0, MAX_TITLE - 1).join('');
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;:?!–-]+$/, '') + '…';
}

/* Markdown → HTML : le titre de la page est le seul <h1>, les "# " du contenu deviennent des <h2> */
marked.use({
  walkTokens(token) {
    if (token.type === 'heading' && token.depth === 1) token.depth = 2;
  },
});

export function renderMarkdown(md) {
  const html = marked.parse(md || '');
  return typeof html === 'string' ? html : '';
}
