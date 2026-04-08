import * as constants from '../constants';

/**
 * Retourne la constante traduite si elle existe, sinon fallback français.
 * Exemple : t("HERO_TITLE", "en") cherche HERO_TITLE_en dans constants.tsx
 *
 * Pour les tableaux d'objets (SPECIALTIES, WORKPLACES…),
 * les propriétés non-texte (ex: icon) sont préservées depuis la version française.
 */
export function t(baseName: string, lang: string): any {
  const all = constants as Record<string, any>;
  const base = all[baseName];

  if (lang === 'fr') return base;

  const translated = all[`${baseName}_${lang}`];
  if (translated === undefined) return base;

  // Tableau d'objets : merge les champs manquants depuis la version fr
  if (Array.isArray(translated) && Array.isArray(base) && translated.length > 0 && typeof translated[0] === 'object') {
    return translated.map((item: Record<string, any>, idx: number) => {
      const baseItem = base[idx] ?? {};
      const merged: Record<string, any> = { ...item };
      for (const key of Object.keys(baseItem)) {
        if (merged[key] === undefined || merged[key] === null) {
          merged[key] = baseItem[key];
        }
      }
      return merged;
    });
  }

  return translated;
}

/**
 * Détecte dynamiquement les langues disponibles en scannant les exports de constants.tsx.
 * Cherche les suffixes _XX ou _XXX sur les clés existantes.
 * Retourne toujours ['fr', ...autres langues trouvées].
 */
export function getAvailableLangs(): string[] {
  const all = constants as Record<string, any>;
  const langs = new Set<string>(['fr']);
  for (const key of Object.keys(all)) {
    const match = key.match(/_([a-z]{2,3})$/);
    if (match) langs.add(match[1]);
  }
  return Array.from(langs);
}

/** Mapping code langue → flag emoji + label */
export const LANG_META: Record<string, { flag: string; label: string }> = {
  fr: { flag: '🇫🇷', label: 'FR' },
  en: { flag: '🇬🇧', label: 'EN' },
  es: { flag: '🇪🇸', label: 'ES' },
  de: { flag: '🇩🇪', label: 'DE' },
  it: { flag: '🇮🇹', label: 'IT' },
  pt: { flag: '🇵🇹', label: 'PT' },
};
