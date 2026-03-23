import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostBySlug, Post } from '../lib/blog';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Calendar, ArrowLeft } from 'lucide-react';
import { marked } from 'marked';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [html, setHtml] = useState('');

  useEffect(() => {
    if (!slug) return;
    const found = getPostBySlug(slug);
    setPost(found);
    if (found) {
      const result = marked.parse(found.content);
      setHtml(typeof result === 'string' ? result : '');
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow pt-32 pb-24 flex items-center justify-center bg-slate-50">
          <div className="text-center">
            <p className="text-slate-500 text-lg mb-6">Article introuvable.</p>
            <Link to="/blog" className="text-primary hover:underline font-medium">
              ← Retour au blog
            </Link>
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
        <article className="container mx-auto px-6 max-w-3xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-8 text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Retour au blog
          </Link>

          {post.image && (
            <div className="rounded-2xl overflow-hidden mb-8 aspect-video">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
            <Calendar size={14} />
            <span>{post.date}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-800 mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-slate-500 mb-10 font-light leading-relaxed border-l-4 border-primary/30 pl-5 italic">
            {post.excerpt}
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

export default BlogPost;
