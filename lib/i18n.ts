import * as constants from '../constants';

/**
 * Retourne la constante traduite si elle existe, sinon fallback français.
 * Exemple : t("HERO_TITLE", "en") cherche HERO_TITLE_en dans constants.tsx
 *
 * Cas spécial : pour les tableaux d'objets (SPECIALTIES, WORKPLACES…),
 * les propriétés non-texte (ex: icon) sont préservées depuis la version française
 * afin d'éviter tout crash si le CMS ne les exporte pas.
 */
export function t(baseName: string, lang: string): any {
  const all = constants as Record<string, any>;
  const base = all[baseName];

  if (lang === 'fr') return base;

  const translated = all[`${baseName}_${lang}`];
  if (translated === undefined) return base;

  // Si c'est un tableau d'objets, on merge les champs manquants depuis la version fr
  if (Array.isArray(translated) && Array.isArray(base) && translated.length > 0 && typeof translated[0] === 'object') {
    return translated.map((item: Record<string, any>, idx: number) => {
      const baseItem = base[idx] ?? {};
      // Copie tous les champs du base qui ne sont pas dans l'item traduit
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
