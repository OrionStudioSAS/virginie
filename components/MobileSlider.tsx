import React, { useRef, useState, useCallback } from 'react';

interface Props {
  children: React.ReactNode[];
  className?: string;       // classe appliquée sur chaque item mobile
  desktopGrid?: string;     // classes Tailwind pour la grille desktop
}

/**
 * Sur mobile  : slider horizontal snap-x avec points de navigation.
 * Sur desktop : laisse les enfants dans un grid normal (desktopGrid).
 */
const MobileSlider: React.FC<Props> = ({
  children,
  className = '',
  desktopGrid = 'md:grid md:grid-cols-3 md:gap-8',
}) => {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const onScroll = useCallback(() => {
    const el = ref.current;
    if (!el || !el.children.length) return;
    const itemW = (el.children[0] as HTMLElement).offsetWidth;
    const idx = Math.round(el.scrollLeft / (itemW + 16)); // 16 = gap-4
    setActive(Math.max(0, Math.min(idx, children.length - 1)));
  }, [children.length]);

  const goTo = (idx: number) => {
    const el = ref.current;
    if (!el || !el.children[idx]) return;
    const item = el.children[idx] as HTMLElement;
    el.scrollTo({ left: item.offsetLeft - 24, behavior: 'smooth' }); // 24 = px-6
    setActive(idx);
  };

  return (
    <div>
      {/* ── Desktop : grid normal ─────────────────────────────────── */}
      <div className={`hidden ${desktopGrid}`}>
        {children}
      </div>

      {/* ── Mobile : slider ──────────────────────────────────────── */}
      <div className="md:hidden">
        <div
          ref={ref}
          onScroll={onScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth -mx-6 px-6 pb-2"
          style={{ scrollbarWidth: 'none' }}
        >
          {children.map((child, i) => (
            <div
              key={i}
              className={`snap-start shrink-0 w-[85vw] ${className}`}
            >
              {child}
            </div>
          ))}
        </div>

        {/* Dots */}
        {children.length > 1 && (
          <div className="flex justify-center gap-2 mt-5">
            {children.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? 'bg-primary w-6' : 'bg-slate-300 w-2'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileSlider;
