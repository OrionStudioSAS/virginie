import React from 'react';
import { PRICES } from '../constants';

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 bg-rose-50/30">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-800 mb-4">
            Honoraires
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-rose-100 reveal active">
          <div className="p-1 bg-gradient-to-r from-rose-200 via-primary to-rose-200"></div>
          <div className="divide-y divide-slate-100">
            {PRICES.map((item, idx) => (
              <div key={idx} className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-center hover:bg-slate-50 transition-colors gap-4">
                <span className="text-lg font-medium text-slate-700 text-center md:text-left">{item.label}</span>
                <span className="text-xl md:text-2xl font-bold text-primary whitespace-nowrap bg-rose-50 px-4 py-1 rounded-full">{item.price}</span>
              </div>
            ))}
          </div>
          <div className="p-6 bg-slate-50 text-center text-sm text-slate-500">
            Moyens de paiement acceptés : Chèques, espèces et carte bancaire.
          </div>
        </div>
        
        <div className="mt-8 text-center text-slate-500 text-sm reveal reveal-delay-200">
          <p>Les consultations diététiques ne sont pas prises en charge par la Sécurité Sociale.</p>
          <p>De nombreuses mutuelles proposent un remboursement partiel ou total, renseignez-vous auprès de la vôtre.</p>
        </div>
      </div>
    </section>
  );
};