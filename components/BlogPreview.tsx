import React from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../lib/blog';
import { Calendar, ArrowRight } from 'lucide-react';

export const BlogPreview: React.FC = () => {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14 reveal reveal-fade">
          <h2 className="inline-block bg-rose-50/80 text-primary font-semibold uppercase tracking-widest text-xs md:text-sm mb-3 px-4 py-1.5 rounded-full shadow-sm">
            Blog & Conseils
          </h2>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-800 mt-2">
            Derniers articles
          </h3>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            Conseils nutritionnels, astuces et réponses à vos questions pour prendre soin de votre santé au quotidien.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 reveal reveal-scale-up">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {post.image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                  <Calendar size={14} />
                  <span>{post.date}</span>
                </div>
                <h4 className="text-lg font-serif font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed flex-grow">{post.excerpt}</p>
                <span className="mt-4 text-primary text-sm font-semibold group-hover:underline">
                  Lire la suite →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12 reveal reveal-fade reveal-delay-200">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-3 rounded-full font-semibold hover:bg-primary hover:text-white transition-all duration-300"
          >
            Voir tous les articles
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};
