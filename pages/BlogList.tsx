import React from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../lib/blog';
import { getAllNews } from '../lib/news';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import Seo from '../components/Seo';
import { Calendar, Rss } from 'lucide-react';

const BlogList: React.FC = () => {
  const posts = getAllPosts().map((p) => ({ ...p, type: 'blog' as const }));
  const news = getAllNews().map((n) => ({ ...n, type: 'news' as const }));

  const combined = [...posts, ...news].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Seo
        title="Blog & Actualités"
        description="Retrouvez tous les conseils nutrition, astuces bien-être et actualités du cabinet de Virginie Lelong, diététicienne nutritionniste à Melun et Corbeil-Essonnes."
        canonical="/blog-et-actualites"
        ogType="website"
      />
      <Navbar />
      <main className="flex-grow pt-32 pb-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="inline-block bg-rose-50/80 text-primary font-semibold uppercase tracking-widest text-xs md:text-sm mb-3 px-4 py-1.5 rounded-full shadow-sm">
              Blog & Actualités
            </h2>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-800 mt-2">
              Toutes les publications
            </h1>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">
              Conseils nutrition, astuces bien-être et actualités du cabinet — tout en un seul endroit.
            </p>
          </div>

          {combined.length === 0 ? (
            <p className="text-center text-slate-500 py-16">Aucune publication pour le moment.</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {combined.map((item) => (
                <Link
                  key={`${item.type}-${item.slug}`}
                  to={item.type === 'news' ? `/actualites/${item.slug}` : `/blog/${item.slug}`}
                  className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  {item.image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <Calendar size={14} />
                        <span>{item.date}</span>
                      </div>
                      {item.type === 'news' ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                          <Rss size={11} /> Actualité
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-primary bg-rose-50 px-2.5 py-1 rounded-full">
                          Article
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl font-serif font-bold text-slate-800 mb-3 group-hover:text-primary transition-colors leading-snug">
                      {item.title}
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed flex-grow">{item.excerpt}</p>
                    <span className="mt-4 text-primary text-sm font-semibold group-hover:underline">
                      Lire la suite →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogList;
