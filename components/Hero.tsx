import React from 'react';
import { Button } from './Button';
import { DOCTOLIB_URL, DOCTOR_IMAGE } from '../constants';
import { ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-32 md:pt-36 pb-24 md:pb-28 bg-gradient-to-br from-rose-50/50 via-white to-slate-50 overflow-hidden"
    >
      {/* Decorative Blobs - Removed green, kept soft pinks/neutrals */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-slate-200/40 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>

      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12 relative z-10">
        <div className="flex-1 space-y-8 text-center md:text-left">
          <div className="reveal reveal-slide-left">
            <h2 className="inline-block bg-rose-50/80 text-primary font-semibold uppercase tracking-widest text-xs md:text-sm mb-3 px-4 py-1.5 rounded-full shadow-sm">
              Diététicienne Nutritionniste
            </h2>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-800 leading-tight">
              Retrouvez votre vitre équilibre <br/>
              avec un accompagnement <span className="text-[#8bc242] underline decoration-[#8bc242]/20 decoration-4 underline-offset-4">personnalisé</span>
            </h1>
          </div>
          
          <p className="reveal reveal-slide-left reveal-delay-100 text-lg text-slate-600 leading-relaxed max-w-lg mx-auto md:mx-0">
            Je vous propose des programmes sur-mesure, un suivi bienveillant et des conseils fondés sur la science de la nutrition.
          </p>
          
          <div className="reveal reveal-scale-up reveal-delay-200 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button href={DOCTOLIB_URL} target="_blank">
              Prendre rendez-vous
            </Button>
            <Button variant="outline" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
              En savoir plus
            </Button>
          </div>
        </div>

        <div className="flex-1 relative reveal reveal-slide-right reveal-delay-300">
          <div className="relative w-full max-w-xl md:max-w-2xl mx-auto aspect-square">
             <div className="absolute inset-0 bg-primary/10 rounded-[2rem] rotate-3 translate-x-3 translate-y-3"></div>
            <img 
              src={DOCTOR_IMAGE} 
              alt="Analyse nutritionnelle et impédancemétrie" 
              className="w-full h-full object-cover object-center rounded-[2rem] shadow-2xl relative z-10 border-4 border-white transition-transform duration-500 hover:scale-[1.01]"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block text-primary/50">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};