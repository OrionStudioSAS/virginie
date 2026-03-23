import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { getAllPosts, Post } from '../lib/blog';
import { Lock, Send, CheckCircle, AlertCircle, RefreshCw, Pencil, Trash2, Plus, X } from 'lucide-react';

function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function toBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

async function getFileSha(repo: string, token: string, slug: string): Promise<string> {
  const res = await fetch(
    `https://api.github.com/repos/${repo}/contents/posts/${slug}.md`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) throw new Error(`Fichier introuvable sur GitHub (${res.status})`);
  const data = await res.json();
  return data.sha;
}

const Admin: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Form state
  const [editingSlug, setEditingSlug] = useState<string | null>(null); // null = new post
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [image, setImage] = useState('');
  const [originalDate, setOriginalDate] = useState('');

  // UI state
  const [loading, setLoading] = useState(false);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Re-read posts (local build-time data)
  const [posts, setPosts] = useState<Post[]>(() => getAllPosts());

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === import.meta.env.VITE_ADMIN_PASSWORD) {
      setAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('Mot de passe incorrect.');
    }
  };

  const resetForm = () => {
    setEditingSlug(null);
    setTitle('');
    setSlug('');
    setContent('');
    setExcerpt('');
    setImage('');
    setOriginalDate('');
    setError('');
    setSuccess('');
  };

  const openNew = () => {
    resetForm();
    setShowForm(true);
  };

  const openEdit = (post: Post) => {
    setEditingSlug(post.slug);
    setTitle(post.title);
    setSlug(post.slug);
    setContent(post.content.trim());
    setExcerpt(post.excerpt);
    setImage(post.image || '');
    setOriginalDate(post.date);
    setError('');
    setSuccess('');
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingSlug) setSlug(slugify(val));
  };

  const buildMarkdown = (date: string) => `---
title: "${title.replace(/"/g, '\\"')}"
date: "${date}"
slug: "${slug}"
excerpt: "${excerpt.replace(/"/g, '\\"')}"
image: "${image}"
---

${content}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !content || !excerpt) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    const repo = import.meta.env.VITE_GITHUB_REPO;
    const branch = import.meta.env.VITE_GITHUB_BRANCH || 'main';
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    const date = editingSlug ? originalDate : new Date().toISOString().split('T')[0];

    try {
      const body: Record<string, string> = {
        message: editingSlug ? `Mise à jour : ${title}` : `Article : ${title}`,
        content: toBase64(buildMarkdown(date)),
        branch,
      };

      // For updates, we need the current file SHA
      if (editingSlug) {
        body.sha = await getFileSha(repo, token, editingSlug);
      }

      const res = await fetch(
        `https://api.github.com/repos/${repo}/contents/posts/${slug}.md`,
        {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || `Erreur ${res.status}`);
      }

      setSuccess(editingSlug ? 'Article mis à jour ! Le site se met à jour dans quelques instants.' : 'Article publié avec succès ! Le site se met à jour dans quelques instants.');
      setShowForm(false);
      resetForm();
      setPosts(getAllPosts());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (post: Post) => {
    setDeletingSlug(post.slug);
    setError('');
    setSuccess('');

    const repo = import.meta.env.VITE_GITHUB_REPO;
    const branch = import.meta.env.VITE_GITHUB_BRANCH || 'main';
    const token = import.meta.env.VITE_GITHUB_TOKEN;

    try {
      const sha = await getFileSha(repo, token, post.slug);

      const res = await fetch(
        `https://api.github.com/repos/${repo}/contents/posts/${post.slug}.md`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: `Suppression : ${post.title}`, sha, branch }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || `Erreur ${res.status}`);
      }

      setSuccess(`"${post.title}" supprimé. Le site se met à jour dans quelques instants.`);
      setPosts(getAllPosts());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
    } finally {
      setDeletingSlug(null);
    }
  };

  // Login screen
  if (!authenticated) {
    return (
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow pt-32 pb-24 flex items-center justify-center bg-slate-50">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-rose-50 rounded-full mb-4">
                <Lock className="text-primary" size={24} />
              </div>
              <h1 className="text-2xl font-serif font-bold text-slate-800">Administration</h1>
              <p className="text-slate-500 text-sm mt-1">Accès réservé</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Mot de passe"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                autoFocus
              />
              {passwordError && (
                <p className="text-red-500 text-sm flex items-center gap-1.5">
                  <AlertCircle size={14} /> {passwordError}
                </p>
              )}
              <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-rose-600 transition-colors">
                Se connecter
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-3xl">

          {/* Global notifications */}
          {success && (
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-xl mb-6">
              <CheckCircle size={20} className="shrink-0" />
              <span>{success}</span>
            </div>
          )}
          {error && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl mb-6">
              <AlertCircle size={20} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Article list */}
          {!showForm && (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-serif font-bold text-slate-800">Articles</h1>
                  <p className="text-slate-500 mt-1">{posts.length} article{posts.length > 1 ? 's' : ''} publié{posts.length > 1 ? 's' : ''}</p>
                </div>
                <button
                  onClick={openNew}
                  className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full font-semibold hover:bg-rose-600 transition-colors shadow-sm"
                >
                  <Plus size={18} />
                  Nouvel article
                </button>
              </div>

              {posts.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center text-slate-400">
                  Aucun article. Créez le premier !
                </div>
              ) : (
                <div className="space-y-3">
                  {posts.map((post) => (
                    <div key={post.slug} className="bg-white rounded-2xl border border-slate-100 px-6 py-5 flex items-center gap-4">
                      {post.image && (
                        <img src={post.image} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                      )}
                      <div className="flex-grow min-w-0">
                        <p className="font-semibold text-slate-800 truncate">{post.title}</p>
                        <p className="text-sm text-slate-400 mt-0.5">{post.date} · /blog/{post.slug}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => openEdit(post)}
                          className="p-2 text-slate-400 hover:text-primary hover:bg-rose-50 rounded-lg transition-colors"
                          title="Modifier"
                        >
                          <Pencil size={17} />
                        </button>
                        <DeleteButton
                          loading={deletingSlug === post.slug}
                          onConfirm={() => handleDelete(post)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Form (new or edit) */}
          {showForm && (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-serif font-bold text-slate-800">
                    {editingSlug ? 'Modifier l\'article' : 'Nouvel article'}
                  </h1>
                  <p className="text-slate-500 mt-1">
                    {editingSlug ? 'Les modifications seront envoyées sur GitHub.' : 'L\'article sera créé sur GitHub et le site se mettra à jour via Vercel.'}
                  </p>
                </div>
                <button
                  onClick={() => { setShowForm(false); resetForm(); }}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Annuler"
                >
                  <X size={22} />
                </button>
              </div>

              {error && (
                <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl mb-6">
                  <AlertCircle size={20} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                {/* Titre */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Titre *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Titre de l'article"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    required
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Slug (URL) *
                    <span className="ml-2 text-slate-400 font-normal text-xs">auto-généré depuis le titre</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="mon-article"
                      disabled={!!editingSlug}
                      className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary font-mono text-sm disabled:bg-slate-50 disabled:text-slate-400"
                      required
                    />
                    {!editingSlug && (
                      <button
                        type="button"
                        onClick={() => setSlug(slugify(title))}
                        className="px-3 py-3 border border-slate-200 rounded-xl text-slate-500 hover:text-primary hover:border-primary transition-colors"
                        title="Regénérer"
                      >
                        <RefreshCw size={16} />
                      </button>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-slate-400">URL : /blog/{slug || 'mon-article'}</p>
                </div>

                {/* Extrait */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Extrait *</label>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Courte description de l'article (1-2 phrases)"
                    rows={2}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                    required
                  />
                </div>

                {/* Contenu */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Contenu (Markdown) *</label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={`## Introduction\n\nRédigez votre article en Markdown...`}
                    rows={18}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-y font-mono text-sm"
                    required
                  />
                  <p className="mt-1 text-xs text-slate-400">
                    Supporte Markdown : # Titre, **gras**, *italique*, - liste, [lien](url)
                  </p>
                </div>

                {/* Image */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Image de couverture
                    <span className="ml-2 text-slate-400 font-normal text-xs">URL (optionnel)</span>
                  </label>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                  {image && (
                    <img src={image} alt="Aperçu" className="mt-3 rounded-xl h-32 object-cover w-full" />
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); resetForm(); }}
                    className="flex-1 border-2 border-slate-200 text-slate-600 py-3.5 rounded-xl font-semibold hover:border-slate-300 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-2 flex-grow bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-rose-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <><RefreshCw size={18} className="animate-spin" /> En cours…</>
                    ) : editingSlug ? (
                      <><Send size={18} /> Mettre à jour</>
                    ) : (
                      <><Send size={18} /> Publier l'article</>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Inline delete button with confirmation step
const DeleteButton: React.FC<{ loading: boolean; onConfirm: () => void }> = ({ loading, onConfirm }) => {
  const [confirming, setConfirming] = useState(false);

  if (loading) {
    return <RefreshCw size={17} className="animate-spin text-slate-400 mx-2" />;
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <span className="text-xs text-slate-500 mr-1">Confirmer ?</span>
        <button
          onClick={() => { setConfirming(false); onConfirm(); }}
          className="px-2.5 py-1.5 bg-red-500 text-white text-xs font-semibold rounded-lg hover:bg-red-600 transition-colors"
        >
          Oui
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="px-2.5 py-1.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg hover:bg-slate-200 transition-colors"
        >
          Non
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
      title="Supprimer"
    >
      <Trash2 size={17} />
    </button>
  );
};

export default Admin;
