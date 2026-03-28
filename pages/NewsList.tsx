import React from 'react';
import { Link } from 'react-router-dom';
import { getAllNews } from '../lib/news';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import Seo from '../components/Seo';
import { ArrowRight } from 'lucide-react';

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function groupByYear(items: ReturnType<typeof getAllNews>) {
  const groups: Record<string, typeof items> = {};
  items.forEach((item) => {
    const year = item.date ? item.date.slice(0, 4) : 'Autres';
    if (!groups[year]) groups[year] = [];
    groups[year].push(item);
  });
  return Object.entries(groups).sort(([a], [b]) => Number(b) - Number(a));
}

const NewsList: React.FC = () => {
  const items = getAllNews();
  const groups = groupByYear(items);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Seo
        title="Fil d'actualité"
        description="Suivez toutes les actualités du cabinet de Virginie Lelong : nouveaux horaires, événements, conseils saisonniers et informations pratiques."
        canonical="/actualites"
        ogType="website"
      />
      <Navbar />
      <main className="flex-grow pt-32 pb-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="inline-block bg-emerald-50 text-emerald-700 font-semibold uppercase tracking-widest text-xs md:text-sm mb-3 px-4 py-1.5 rounded-full shadow-sm">
              Fil d'actualité
            </h2>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-800 mt-2">
              Toutes les actualités
            </h1>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">
              Nouveaux horaires, événements, conseils saisonniers et informations pratiques du cabinet.
            </p>
          </div>

          {items.length === 0 ? (
            <p className="text-center text-slate-500 py-16">Aucune actualité pour le moment.</p>
          ) : (
            <div className="space-y-14">
              {groups.map(([year, groupItems]) => (
                <div key={year}>
                  {/* Séparateur année */}
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-2xl font-serif font-bold text-slate-300">{year}</span>
                    <div className="flex-1 h-px bg-slate-200" />
                  </div>

                  <div className="relative">
                    {/* Ligne timeline */}
                    <div className="absolute left-[1.65rem] top-3 bottom-3 w-px bg-emerald-100 hidden md:block" />

                    <div className="space-y-5">
                      {groupItems.map((item) => (
                        <Link
                          key={item.slug}
                          to={`/actualites/${item.slug}`}
                          className="group flex gap-5 items-start"
                        >
                          {/* Dot timeline */}
                          <div className="hidden md:flex shrink-0 w-[3.3rem] flex-col items-center pt-1">
                            <div className="w-3.5 h-3.5 rounded-full bg-emerald-200 border-2 border-emerald-500 group-hover:bg-emerald-500 transition-colors z-10" />
                          </div>

                          {/* Card */}
                          <div className="flex-1 bg-white rounded-2xl border border-slate-100 px-6 py-5 group-hover:border-emerald-200 group-hover:shadow-sm transition-all duration-200">
                            <p className="text-xs text-emerald-600 font-medium mb-2 uppercase tracking-wide">
                              {formatDate(item.date)}
                            </p>
                            <div className="flex items-start gap-4">
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-20 h-20 rounded-xl object-cover shrink-0 hidden sm:block"
                                />
                              )}
                              <div className="flex-1 min-w-0">
                                <h2 className="text-lg font-serif font-bold text-slate-800 leading-snug group-hover:text-emerald-700 transition-colors">
                                  {item.title}
                                </h2>
                                <p className="text-slate-500 text-sm mt-1.5 leading-relaxed line-clamp-3">
                                  {item.excerpt}
                                </p>
                              </div>
                              <ArrowRight size={17} className="shrink-0 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all mt-1" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsList;
