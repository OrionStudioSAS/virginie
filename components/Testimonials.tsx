import React from 'react';
import { TESTIMONIALS, GOOGLE_REVIEW_URL } from '../constants';
import { Star, Quote } from 'lucide-react';
import { Button } from './Button';

type Props = {
  onOpenReview?: () => void;
};

export const Testimonials: React.FC<Props> = ({ onOpenReview }) => {
  return (
    <section id="testimonials" className="py-24 bg-rose-50/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal">
            <div className="flex justify-center mb-4">
                 <div className="p-3 bg-white rounded-full shadow-sm text-yellow-400">
                    <Star size={24} fill="currentColor" />
                 </div>
            </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-800 mb-4">
            Ce qu'en pensent mes patients
          </h2>
          <p className="text-slate-500">Retours d'expériences</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {TESTIMONIALS.map((item, idx) => (
            <div key={idx} className={`bg-white p-8 rounded-2xl shadow-sm border border-rose-50 reveal reveal-delay-${idx * 100} hover:shadow-md transition-shadow`}>
              <div className="flex gap-1 text-yellow-400 mb-6">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-slate-600 italic mb-6 leading-relaxed relative z-10">
                <span className="text-6xl absolute -top-6 -left-2 text-rose-100 font-serif opacity-50 select-none">"</span>
                {item.text}
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-sm">
                    {item.name.charAt(0)}
                </div>
                <p className="font-bold text-slate-800 text-sm">{item.name}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center reveal reveal-delay-300">
             <div className="flex justify-center">
               <Button onClick={() => (onOpenReview ? onOpenReview() : window.open(GOOGLE_REVIEW_URL, '_blank'))} variant="primary">
                 Poster un avis
               </Button>
             </div>
        </div>
      </div>
    </section>
  );
};