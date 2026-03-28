import React from 'react';
import { Link } from 'react-router-dom';
import { getAllNews } from '../lib/news';
import { ArrowRight, Rss } from 'lucide-react';

function formatDate(dateStr: string): { day: string; month: string; year: string } {
  const d = new Date(dateStr);
  return {
    day: d.toLocaleDateString('fr-FR', { day: '2-digit' }),
    month: d.toLocaleDateString('fr-FR', { month: 'short' }).replace('.', ''),
    year: d.getFullYear().toString(),
  };
}

export const NewsPreview: React.FC = () => {
  const items = getAllNews().slice(0, 4);

  if (items.length === 0) return null;

  return (
    <section id="actualites" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14 reveal reveal-fade">
          <h2 className="inline-block bg-emerald-50 text-emerald-700 font-semibold uppercase tracking-widest text-xs md:text-sm mb-3 px-4 py-1.5 rounded-full shadow-sm">
            Fil d'actualité
          </h2>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-800 mt-2">
            Dernières actualités
          </h3>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            Nouveaux horaires, événements, conseils saisonniers et informations pratiques du cabinet.
          </p>
        </div>

        <div className="max-w-3xl mx-auto reveal reveal-fade">
          <div className="relative">
            {/* Ligne verticale de la timeline */}
            <div className="absolute left-16 top-0 bottom-0 w-px bg-slate-100 hidden md:block" />

            <div className="space-y-6">
              {items.map((item, index) => {
                const { day, month, year } = formatDate(item.date);
                return (
                  <Link
                    key={item.slug}
                    to={`/actualites/${item.slug}`}
                    className="group flex gap-6 items-start"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    {/* Badge date */}
                    <div className="hidden md:flex shrink-0 flex-col items-center justify-center w-12 h-14 bg-emerald-50 rounded-xl text-center z-10 group-hover:bg-emerald-100 transition-colors">
                      <span className="text-lg font-bold text-emerald-700 leading-none">{day}</span>
                      <span className="text-xs font-medium text-emerald-600 uppercase mt-0.5">{month}</span>
                      <span className="text-[10px] text-emerald-500">{year}</span>
                    </div>

                    {/* Contenu */}
                    <div className="flex-1 bg-slate-50 rounded-2xl px-6 py-5 group-hover:bg-emerald-50/40 group-hover:shadow-sm transition-all duration-200 border border-transparent group-hover:border-emerald-100">
                      <div className="flex items-start gap-4">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-16 rounded-xl object-cover shrink-0 hidden sm:block"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          {/* Date mobile */}
                          <p className="text-xs text-slate-400 mb-1 md:hidden">{day} {month} {year}</p>
                          <h4 className="font-serif font-bold text-slate-800 text-lg leading-snug group-hover:text-emerald-700 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-slate-500 text-sm mt-1.5 leading-relaxed line-clamp-2">
                            {item.excerpt}
                          </p>
                        </div>
                        <ArrowRight size={18} className="shrink-0 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all mt-1" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="text-center mt-12 reveal reveal-fade reveal-delay-200">
          <Link
            to="/actualites"
            className="inline-flex items-center gap-2 border-2 border-emerald-600 text-emerald-700 px-8 py-3 rounded-full font-semibold hover:bg-emerald-600 hover:text-white transition-all duration-300"
          >
            <Rss size={17} />
            Toutes les actualités
          </Link>
        </div>
      </div>
    </section>
  );
};
