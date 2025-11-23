import React from 'react';
import { SQUARE_LOGO } from '../constants';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 text-slate-600 py-12 border-t border-slate-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Logo Section Matching Header */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg overflow-hidden shadow-sm border border-slate-200">
              <img src={SQUARE_LOGO} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xl font-serif font-bold text-slate-900 leading-none">
                Virginie Mazaud
              </span>
              <span className="text-primary text-sm font-medium tracking-wide">
                Diététicienne Nutritionniste
              </span>
            </div>
          </div>

          <div className="flex gap-6 text-sm font-medium">
            <a href="#" className="hover:text-primary transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-primary transition-colors">Politique de confidentialité</a>
          </div>

          <div className="text-sm text-slate-500">
            © {currentYear} Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
};