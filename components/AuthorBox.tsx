import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_LOGO, APROPOS_NOM, DOCTOLIB_URL } from '../constants';

// Signature en fin d'article : identifie l'autrice et sa qualification (crédibilité santé pour Google et les IA)
const AuthorBox: React.FC = () => (
  <aside className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
    <img src={SITE_LOGO} alt={APROPOS_NOM} className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
    <div className="flex-grow">
      <p className="text-slate-800 font-semibold">Écrit par {APROPOS_NOM}</p>
      <p className="text-slate-500 text-sm mt-1">
        Diététicienne-nutritionniste diplômée d'État, en consultation à Melun et Corbeil-Essonnes.
      </p>
      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm font-medium">
        <Link to="/" className="text-primary hover:underline">Découvrir le cabinet</Link>
        <a href={DOCTOLIB_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          Prendre rendez-vous
        </a>
      </div>
    </div>
  </aside>
);

export default AuthorBox;
