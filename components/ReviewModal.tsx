import React, { useEffect, useRef } from 'react';
import { WORKPLACES } from '../constants';
import { X, MapPin, ExternalLink } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
};

export const ReviewModal: React.FC<Props> = ({ open, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const prevActive = document.activeElement as HTMLElement | null;

    const focusable = modalRef.current?.querySelectorAll<HTMLElement>('a[href], button, [tabindex]:not([tabindex="-1"])');
    focusable && focusable[0]?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === 'Tab' && focusable && focusable.length > 0) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      prevActive?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" aria-hidden={!open}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div ref={modalRef} role="dialog" aria-modal="true" aria-label="Poster un avis" className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-6 z-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Poster un avis</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>

        <p className="text-sm text-slate-600 mb-4">Choisissez le cabinet pour lequel vous souhaitez laisser un avis. Un nouvel onglet s'ouvrira vers Google Maps.</p>

        <div className="grid gap-4">
          {WORKPLACES.map((place) => (
            <div key={place.id} className="flex items-center justify-between gap-4 p-4 rounded-lg border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-md">
                  <MapPin className="text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800">{place.name}</div>
                  <div className="text-sm text-slate-500">{place.address}</div>
                </div>
              </div>
              <div>
                <a
                  href={place.reviewUrl ?? place.mapUrl ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-white font-semibold hover:bg-rose-600"
                >
                  Poster un avis
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
