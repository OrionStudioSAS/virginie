# Projet : Site Virginie Lelong — Diététicienne Nutritionniste

## Stack
- Vite + React + TypeScript + Tailwind CSS
- Hébergé sur **Vercel**, repo GitHub : `OrionStudioSAS/virginie`, branche `main`
- Déploiement automatique à chaque push sur `main`

## Commandes
```bash
npm run dev      # Dev local sur http://localhost:3000
npm run build    # Build prod (génère sitemap + RSS avant)
vercel dev       # Pour tester les API routes en local
```

## Structure clé
```
/posts/          # Articles de blog (Markdown + frontmatter)
/news/           # Actualités (Markdown + frontmatter)
/pages/          # BlogList, BlogPost, NewsList, NewsPost, Admin
/components/     # BlogPreview, NewsPreview, Navbar, Footer, Seo...
/api/            # Vercel serverless functions (publish, delete, upload-image...)
/lib/            # blog.ts, news.ts — lecture des fichiers .md
/scripts/        # generate-seo.js — génère sitemap.xml + rss.xml + rss-actualites.xml
/public/         # sitemap.xml, rss.xml, rss-actualites.xml, assets/blog/
```

## Routes
- `/` Homepage (Hero, About, BlogPreview, NewsPreview, Testimonials, Contact, FAQ)
- `/blog-et-actualites` Liste unifiée articles + actualités (tri par date)
- `/blog/:slug` Article individuel
- `/actualites/:slug` Actualité individuelle
- `/admin` Espace admin protégé (onglets Blog / Actualités)

## API Routes (Vercel serverless — token côté serveur)
- `POST /api/publish` — créer/modifier un article blog
- `POST /api/delete` — supprimer un article blog
- `POST /api/publish-news` — créer/modifier une actualité
- `POST /api/delete-news` — supprimer une actualité
- `POST /api/upload-image` — uploader image ou PDF vers `/public/assets/blog/`
- `POST /api/verify` — vérifier le mot de passe admin

## Variables d'environnement
Dans `.env.local` (et sur Vercel) :
- `GITHUB_TOKEN` — token GitHub (serveur uniquement, sans préfixe VITE_)
- `GITHUB_REPO` — `OrionStudioSAS/virginie`
- `GITHUB_BRANCH` — `main`
- `ADMIN_PASSWORD` — mot de passe admin (serveur uniquement)

## Auth admin
- Mot de passe saisi → envoyé à `/api/verify` → stocké dans `sessionStorage` si OK
- Toutes les actions API vérifient le mot de passe côté serveur
- Déconnexion automatique à la fermeture de l'onglet

## SEO
- `react-helmet-async` gère canonical, og:tags, twitter cards
- `/admin` est en `noindex`
- `robots.txt` : Disallow /admin
- `scripts/generate-seo.js` s'exécute au build : sitemap + 2 flux RSS

## Frontmatter des fichiers .md
```yaml
---
title: "Titre de l'article"
date: "2026-04-01"
slug: "slug-de-l-article"
excerpt: "Courte description."
image: "/assets/blog/image.jpg"  # optionnel
---
Contenu Markdown...
```

## Workflow push
```bash
git add <fichiers>
git commit -m "message"
git pull --rebase origin main && git push origin main
```
