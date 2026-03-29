import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNewsBySlug, NewsItem } from '../lib/news';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import Seo from '../components/Seo';
import { Calendar, ArrowLeft } from 'lucide-react';
import { marked } from 'marked';

const NewsPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [item, setItem] = useState<NewsItem | undefined>(undefined);
  const [html, setHtml] = useState('');

  useEffect(() => {
    if (!slug) return;
    const found = getNewsBySlug(slug);
    setItem(found);
    if (found) {
      const result = marked.parse(found.content);
      setHtml(typeof result === 'string' ? result : '');
    }
  }, [slug]);

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col font-sans">
        <Seo title="Actualité introuvable" noIndex={true} />
        <Navbar />
        <main className="flex-grow pt-32 pb-24 flex items-center justify-center bg-slate-50">
          <div className="text-center">
            <p className="text-slate-500 text-lg mb-6">Actualité introuvable.</p>
            <Link to="/blog-et-actualites" className="text-emerald-700 hover:underline font-medium">
              ← Retour au blog & actualités
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Seo
        title={item.title}
        description={item.excerpt}
        canonical={`/actualites/${item.slug}`}
        ogImage={item.image}
        ogType="article"
        publishedDate={item.date}
      />
      <Navbar />
      <main className="flex-grow pt-32 pb-24 bg-slate-50">
        <article className="container mx-auto px-6 max-w-3xl">
          <Link
            to="/blog-et-actualites"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-700 transition-colors mb-8 text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Retour au blog & actualités
          </Link>

          {item.image && (
            <div className="rounded-2xl overflow-hidden mb-8 aspect-video">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
              Actualité
            </span>
            <span className="flex items-center gap-1.5 text-slate-400 text-sm">
              <Calendar size={13} />
              {new Date(item.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-800 mb-6 leading-tight">
            {item.title}
          </h1>

          <p className="text-lg text-slate-500 mb-10 font-light leading-relaxed border-l-4 border-emerald-200 pl-5 italic">
            {item.excerpt}
          </p>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
            <div className="article-content" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default NewsPost;
