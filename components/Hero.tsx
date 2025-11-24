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
          <div className="reveal active">
            <h2 className="text-primary font-semibold uppercase tracking-widest text-sm mb-2">Diététicienne Nutritionniste</h2>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-800 leading-tight">
              Retrouvez le plaisir <br/>
              de <span className="text-primary underline decoration-primary/20 decoration-4 underline-offset-4">manger sainement</span>
            </h1>
          </div>
          
          <p className="reveal active reveal-delay-100 text-lg text-slate-600 leading-relaxed max-w-lg mx-auto md:mx-0">
            J'accompagne mes patients vers un équilibre alimentaire durable, sans frustration, adapté à votre mode de vie et à vos besoins.
          </p>
          
          <div className="reveal active reveal-delay-200 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button href={DOCTOLIB_URL} target="_blank">
              Prendre rendez-vous
            </Button>
            <Button variant="outline" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
              En savoir plus
            </Button>
          </div>
        </div>

        <div className="flex-1 relative reveal active reveal-delay-300">
          <div className="relative w-full max-w-md mx-auto aspect-[3/4]">
             <div className="absolute inset-0 bg-primary/10 rounded-[2rem] rotate-3 translate-x-2 translate-y-2"></div>
            <img 
              src={DOCTOR_IMAGE} 
              alt="Virginie Mazaud" 
              className="w-full h-full object-cover object-left rounded-[2rem] shadow-2xl relative z-10 border-4 border-white transition-transform duration-500 hover:scale-[1.01]"
            />
            {/* Decorative badge */}
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg z-20 flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
               <div className="h-3 w-3 rounded-full bg-green-500"></div>
               <span className="font-semibold text-slate-700 text-sm">Disponibilités cette semaine</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block text-primary/50">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};