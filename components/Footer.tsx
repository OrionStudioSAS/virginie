import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 text-slate-600 py-12 border-t border-slate-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Logo Section Matching Header */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg overflow-hidden shadow-sm border border-slate-200">
              <img id="cms-footer_logo" src={new URL('../assets/logo.jpeg', import.meta.url).href} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col text-left">
              <span id="cms-footer_nom" className="text-xl font-serif font-bold text-slate-900 leading-none">
                Virginie Lelong Mazaud
              </span>
              <span id="cms-footer_titre" className="text-primary text-sm font-medium tracking-wide">
                Diététicienne Nutritionniste
              </span>
            </div>
          </div>

          <div className="flex gap-6 text-sm font-medium">
            <a href="/mentions-legales.html" className="hover:text-primary transition-colors">Mentions légales</a>
            <a href="/politique-confidentialite.html" className="hover:text-primary transition-colors">Politique de confidentialité</a>
          </div>

          <div className="text-sm text-slate-500">
            © {currentYear} Tous droits réservés.
          </div>
        </div>
        <div className="mt-6 text-sm text-slate-500 text-center">
          Site réalisé par{' '}
          <a
            href="https://orion-studio.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Orion Studio
          </a>{' '}
          ❤️
        </div>
      </div>
    </footer>
  );
};