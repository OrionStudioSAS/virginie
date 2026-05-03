import React, { useState } from 'react';
import { DOCTOLIB_URL, GOOGLE_REVIEW_URL, PHONE_NUMBER, PHONE_TEL, EMAIL_ADDRESS } from '../constants';
import { useLanguage } from '../lib/LanguageContext';
import { t } from '../lib/i18n';
import { Button } from './Button';
import { ExternalLink, Phone, Mail, Clock, MapPin, MessageSquare, ChevronDown } from 'lucide-react';
import { ScheduleItem } from '../types';

type Props = {
  onOpenReview?: () => void;
};

export const Contact: React.FC<Props> = ({ onOpenReview }) => {
  const { lang } = useLanguage();
  const schedule: ScheduleItem[] = t('SCHEDULE', lang);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-slate-100 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-50 rounded-full translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Schedule Column */}
          <div className="reveal reveal-slide-left bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full"></div>

            {/* Header — cliquable sur mobile uniquement */}
            <button
              onClick={() => setScheduleOpen(o => !o)}
              className="md:pointer-events-none w-full flex items-center justify-between gap-4 mb-0 md:mb-8 relative z-10"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <Clock size={32} />
                </div>
                <div className="text-left">
                  <h2 className="text-3xl font-serif font-bold text-slate-800">{t('CONTACT_HORAIRES_TITRE', lang)}</h2>
                  <p className="text-slate-500 text-sm">{t('CONTACT_HORAIRES_SOUS_TITRE', lang)}</p>
                </div>
              </div>
              <ChevronDown
                className={`md:hidden text-slate-400 w-6 h-6 flex-shrink-0 transition-transform duration-300 ${scheduleOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Liste des horaires — accordéon mobile, toujours visible desktop */}
            <div className={`overflow-hidden transition-all duration-300 relative z-10
              ${scheduleOpen ? 'max-h-[1000px] opacity-100 mt-8' : 'max-h-0 opacity-0 md:max-h-none md:opacity-100 md:mt-0'}
            `}>
              <div className="space-y-4">
                {schedule.map((item, index) => (
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
          </div>

          {/* Contact & Actions Column */}
          <div className="flex flex-col gap-8 justify-center h-full reveal reveal-slide-right">

            <div className="reveal reveal-scale-up reveal-delay-100">
              <h2 className="text-3xl font-serif font-bold text-slate-800 mb-6">{t('CONTACT_TITRE', lang)}</h2>
              <div className="flex flex-col gap-4">
                <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-primary/30 hover:bg-slate-50 bg-white transition-all group shadow-sm">
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

            <div className="text-center md:text-left reveal reveal-pop reveal-delay-200 pt-6 border-t border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-2">{t('CONTACT_RDV_TITRE', lang)}</h3>
              <p className="text-slate-600 mb-6 leading-relaxed text-sm">{t('CONTACT_RDV_DESCRIPTION', lang)}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href={DOCTOLIB_URL} target="_blank" className="flex-1 shadow-lg shadow-rose-500/20 py-4 text-lg justify-center">
                  <span className="flex items-center gap-2">
                    Prendre RDV <ExternalLink size={20} />
                  </span>
                </Button>
                <Button
                  onClick={() => (onOpenReview ? onOpenReview() : window.open(GOOGLE_REVIEW_URL, '_blank'))}
                  variant="outline"
                  className="flex-1 py-4 text-lg justify-center"
                >
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
