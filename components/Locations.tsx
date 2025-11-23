import React from 'react';
import { WORKPLACES } from '../constants';
import { MapPin } from 'lucide-react';

export const Locations: React.FC = () => {
  return (
    <section id="locations" className="py-24 bg-neutral">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-800 mb-4">
            Lieux de consultation
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Je vous accueille dans mes trois cabinets situés en Seine-et-Marne et en Essonne.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {WORKPLACES.map((place, idx) => (
            <div key={place.id} className={`reveal reveal-delay-${(idx + 1) * 100} bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col`}>
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <img 
                  src={place.imageUrl} 
                  alt={place.name} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-primary transition-colors mb-2">{place.name}</h3>
                  <div className="flex items-start gap-2 mb-4">
                    <MapPin className="text-primary w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-600 font-medium">{place.address}</p>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {place.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-secondary hover:text-green-600 inline-flex items-center gap-1"
                  >
                    Voir sur la carte →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};