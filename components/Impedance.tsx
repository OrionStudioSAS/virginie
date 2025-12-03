
import React from 'react';
import { IMPEDANCE_IMAGE, IMPEDANCE_TITLE, IMPEDANCE_DESCRIPTION, IMPEDANCE_BENEFITS } from '../constants';
import { Activity, CheckCircle, Smartphone } from 'lucide-react';

export const Impedance: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden border-t border-slate-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Text Content */}
          <div className="flex-1 reveal reveal-slide-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-6">
               <Activity size={16} />
               <span>Technologie Professionnelle</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-800 mb-6">
              {IMPEDANCE_TITLE}
            </h2>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {IMPEDANCE_DESCRIPTION}
            </p>

            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-8">
              {IMPEDANCE_BENEFITS.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="mt-1 flex-shrink-0">
                     <CheckCircle className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-500 leading-snug">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Side */}
          <div className="flex-1 w-full reveal reveal-slide-right reveal-delay-200">
             <div className="relative group">
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white aspect-[3/4] lg:aspect-auto lg:max-h-[640px] lg:max-w-[480px]">
                    <img 
                    src={IMPEDANCE_IMAGE} 
                    alt="Analyse impédancemétrie" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
                        <p className="font-medium text-sm flex items-center gap-2">
                            <Smartphone size={16} />
                            Bilan complet & suivi détaillé
                        </p>
                    </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};
