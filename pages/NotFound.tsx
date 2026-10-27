import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import Seo from '../components/Seo';

const NotFound: React.FC = () => (
  <div className="min-h-screen flex flex-col font-sans">
    <Seo title="Page introuvable" noIndex={true} />
    <Navbar />
    <main className="flex-grow pt-32 pb-24 flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-800 mb-4">Page introuvable</h1>
        <p className="text-slate-500 text-lg mb-6">La page que vous cherchez n'existe pas ou a été déplacée.</p>
        <div className="flex gap-6 justify-center">
          <Link to="/" className="text-primary hover:underline font-medium">← Accueil</Link>
          <Link to="/blog-et-actualites" className="text-primary hover:underline font-medium">Blog & actualités</Link>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default NotFound;
