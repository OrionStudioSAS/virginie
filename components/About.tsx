import React, { useState } from 'react';
import { BIO_TEXT, SPECIALTIES, DIPLOMAS, ASSOCIATIONS, FULL_NAME } from '../constants';
import { Award, Users, ChevronDown } from 'lucide-react';

export const About: React.FC = () => {
  const [diplomasOpen, setDiplomasOpen] = useState(false);
  const [associationsOpen, setAssociationsOpen] = useState(false);
  const highlightKeywords = (text: string) => {
    const keywords = [
      "alimentation équilibrée",
      "perte de poids",
      "obésité",
      "diabète",
      "hypertension",
      "ménopause",
      "grossesse",
      "sport",
      "maladies cardiovasculaires",
      "chirurgie bariatrique",
      "bilan complet",
      "suivi régulier",
      "conseils pratiques",
      "impédancemètre",
      "composition corporelle",
      "équilibre alimentaire",
      "santé"
    ];

    const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    return keywords.reduce((acc, keyword) => {
      const regex = new RegExp(escapeRegExp(keyword), 'gi');
      return acc.replace(regex, (match) => `<span class="text-slate-900 font-semibold">${match}</span>`);
    }, text);
  };

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        
        {/* Bio Section */}
        <div className="max-w-4xl mx-auto mb-20 reveal">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-800 mb-6 relative inline-block">
              {FULL_NAME}
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary/20 to-primary/60 rounded-full"></span>
            </h2>
            <h3 className="text-xl text-primary font-medium">Diététicienne-Nutritionniste diplômée d'État</h3>
          </div>
          
          <div className="bg-slate-50 p-8 md:p-10 rounded-3xl border border-slate-100 shadow-sm leading-relaxed text-lg text-slate-600 space-y-5">
            {BIO_TEXT.map((paragraph, index) => (
              <p 
                key={index}
                className="text-slate-600"
                dangerouslySetInnerHTML={{ __html: highlightKeywords(paragraph) }}
              />
            ))}
          </div>
        </div>

        {/* Specialties Grid - New Design */}
        <div className="mb-24">
          <div className="text-center mb-12 reveal">
            <h3 className="text-3xl font-serif font-bold text-slate-800 mb-4">Mes Domaines d'Expertise</h3>
            <p className="text-slate-500 max-w-2xl mx-auto">Parce que chaque corps est unique, je vous propose un accompagnement adapté à vos besoins spécifiques.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SPECIALTIES.map((service, index) => (
              <div 
                key={index} 
                className={`reveal reveal-scale-up reveal-delay-${(index % 3) * 100} bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100 hover:border-rose-100`}
              >
                <div className="w-14 h-14 bg-rose-50 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <service.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Diplomas & Associations */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Diplômes - Accordion on mobile, normal on desktop */}
          <div className="reveal">
            {/* Mobile: Clickable header */}
            <button 
              onClick={() => setDiplomasOpen(!diplomasOpen)}
              className="md:pointer-events-none w-full flex items-center justify-between gap-3 mb-6 md:cursor-default"
            >
              <div className="flex items-center gap-3">
                <Award className="text-primary w-8 h-8" />
                <h3 className="text-2xl font-serif font-bold text-slate-800">Diplômes & Formations</h3>
              </div>
              <ChevronDown 
                className={`md:hidden text-slate-400 w-6 h-6 transition-transform duration-300 ${diplomasOpen ? 'rotate-180' : ''}`}
              />
            </button>
            
            {/* Content - Collapsible on mobile, always visible on desktop */}
            <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300 ${
              diplomasOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 md:max-h-none md:opacity-100'
            }`}>
              <div className="p-6 md:p-8">
                <ul className="space-y-3">
                  {DIPLOMAS.map((diploma, idx) => (
                    <li key={idx} className="text-slate-600 text-sm md:text-base border-b border-slate-50 last:border-0 pb-2 last:pb-0">
                      • {diploma}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Associations - Accordion on mobile, normal on desktop */}
          <div className="reveal reveal-delay-200">
            {/* Mobile: Clickable header */}
            <button 
              onClick={() => setAssociationsOpen(!associationsOpen)}
              className="md:pointer-events-none w-full flex items-center justify-between gap-3 mb-6 md:cursor-default"
            >
              <div className="flex items-center gap-3">
                <Users className="text-secondary w-8 h-8" />
                <h3 className="text-2xl font-serif font-bold text-slate-800">Membre des associations</h3>
              </div>
              <ChevronDown 
                className={`md:hidden text-slate-400 w-6 h-6 transition-transform duration-300 ${associationsOpen ? 'rotate-180' : ''}`}
              />
            </button>
            
            {/* Content - Collapsible on mobile, always visible on desktop */}
            <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300 ${
              associationsOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 md:max-h-none md:opacity-100'
            }`}>
              <div className="p-6 md:p-8">
                <ul className="space-y-3">
                  {ASSOCIATIONS.map((asso, idx) => (
                    <li key={idx} className="text-slate-600 text-sm md:text-base flex items-start gap-2">
                      <span className="text-secondary mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0"></span>
                      {asso}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};