import React from 'react';
import { DOCTOLIB_URL, PHONE_NUMBER, EMAIL_ADDRESS, SCHEDULE, GOOGLE_REVIEW_URL } from '../constants';
import { Button } from './Button';
import { ExternalLink, Phone, Mail, Clock, MapPin, MessageSquare } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-slate-100 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-50 rounded-full translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Schedule Column */}
          <div className="reveal bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full"></div>
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Clock size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-serif font-bold text-slate-800">Horaires</h2>
                <p className="text-slate-500 text-sm">Sur rendez-vous uniquement</p>
              </div>
            </div>
            
            <div className="space-y-4 relative z-10">
               {SCHEDULE.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row justify-between sm:items-center py-3 border-b border-slate-50 last:border-0 gap-1">
                  <span className="font-semibold text-slate-700 w-24">{item.day}</span>
                  <div className="flex flex-col sm:items-end">
                      <span className="text-primary font-medium">{item.hours}</span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                         <MapPin size={12} /> {item.location?.split(',')[0]}
                      </span>
                  </div>
                </div>
               ))}
            </div>
          </div>

          {/* Contact & Actions Column */}
          <div className="flex flex-col gap-8">
             
             {/* Contact Info Cards */}
            <div className="reveal reveal-delay-100">
               <h2 className="text-3xl font-serif font-bold text-slate-800 mb-6">Me contacter</h2>
               <div className="flex flex-col gap-4">
                  <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-primary/30 hover:bg-slate-50 bg-white transition-all group shadow-sm">
                    <div className="bg-slate-100 p-3 rounded-full group-hover:bg-primary group-hover:text-white transition-colors text-slate-600">
                      <Phone size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide">Téléphone</p>
                        <span className="font-semibold text-lg text-slate-800">{PHONE_NUMBER}</span>
                    </div>
                  </a>
                  <a href={`mailto:${EMAIL_ADDRESS}`} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-primary/30 hover:bg-slate-50 bg-white transition-all group shadow-sm">
                    <div className="bg-slate-100 p-3 rounded-full group-hover:bg-primary group-hover:text-white transition-colors text-slate-600">
                      <Mail size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide">Email</p>
                        <span className="font-medium text-lg text-slate-800 break-all">{EMAIL_ADDRESS}</span>
                    </div>
                  </a>
               </div>
            </div>

            {/* Appointment & Review CTA */}
            <div className="text-center md:text-left reveal reveal-delay-200 pt-6 border-t border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Rendez-vous & Avis
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                Prenez rendez-vous en ligne ou partagez votre expérience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href={DOCTOLIB_URL} target="_blank" className="flex-1 shadow-lg shadow-rose-500/20 py-4 text-lg justify-center">
                    <span className="flex items-center gap-2">
                    Prendre RDV <ExternalLink size={20} />
                    </span>
                </Button>
                <Button href={GOOGLE_REVIEW_URL} target="_blank" variant="outline" className="flex-1 py-4 text-lg justify-center">
                    <span className="flex items-center gap-2">
                    Laisser un avis <MessageSquare size={20} />
                    </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};