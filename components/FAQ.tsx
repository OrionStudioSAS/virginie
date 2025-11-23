import React, { useState } from 'react';
import { FAQ_ITEMS } from '../constants';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="flex items-center justify-center gap-3 mb-12 reveal">
          <HelpCircle className="text-secondary w-8 h-8" />
          <h2 className="text-3xl font-serif font-bold text-slate-800">Questions Fréquentes</h2>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => (
            <div 
              key={idx} 
              className={`border border-slate-200 rounded-xl overflow-hidden transition-all duration-300 ${openIndex === idx ? 'shadow-md border-primary/30' : 'hover:border-slate-300'}`}
            >
              <button
                onClick={() => toggleIndex(idx)}
                className="w-full flex justify-between items-center p-5 text-left bg-white focus:outline-none"
              >
                <span className="font-semibold text-slate-800 text-lg">{item.question}</span>
                {openIndex === idx ? (
                  <ChevronUp className="text-primary w-5 h-5 flex-shrink-0" />
                ) : (
                  <ChevronDown className="text-slate-400 w-5 h-5 flex-shrink-0" />
                )}
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === idx ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-5 pt-0 text-slate-600 leading-relaxed border-t border-slate-50 bg-slate-50/50 whitespace-pre-line">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};