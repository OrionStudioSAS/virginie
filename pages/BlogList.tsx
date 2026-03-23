import React from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../lib/blog';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import Seo from '../components/Seo';
import { Calendar } from 'lucide-react';

const BlogList: React.FC = () => {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Seo
        title="Blog & Conseils Nutrition"
        description="Retrouvez tous les conseils nutrition, astuces bien-être et réponses à vos questions par Virginie Lelong, diététicienne nutritionniste à Melun et Corbeil-Essonnes."
        canonical="/blog"
        ogType="website"
      />
      <Navbar />
      <main className="flex-grow pt-32 pb-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="inline-block bg-rose-50/80 text-primary font-semibold uppercase tracking-widest text-xs md:text-sm mb-3 px-4 py-1.5 rounded-full shadow-sm">
              Blog & Conseils
            </h2>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-800 mt-2">
              Tous les articles
            </h1>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">
              Retrouvez tous mes conseils nutrition, astuces bien-être et réponses à vos questions.
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="text-center text-slate-500 py-16">Aucun article pour le moment.</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                    <h2 className="text-xl font-serif font-bold text-slate-800 mb-3 group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed flex-grow">{post.excerpt}</p>
                    <span className="mt-4 text-primary text-sm font-semibold group-hover:underline">
                      Lire l'article →
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
