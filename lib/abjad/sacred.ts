/**
 * Sacred-number resonance — ported from asrar-mobile's hadad-core.ts
 * (sacredSet/sacredSignificance), translated to fr/ar since the source only
 * carried English text for these (short, well-established facts — surah
 * counts, the 99 names, the Bismillah value — not content requiring the
 * cheikh's own wording).
 */

import type { TriText } from './buruj';

export const SACRED_SET = [7, 12, 19, 70, 99, 114, 313, 786] as const;

export const SACRED_SIGNIFICANCE: Record<number, TriText> = {
  7: { en: 'Seven heavens, seven days of creation', fr: 'Sept cieux, sept jours de la création', ar: 'سبع سماوات، سبعة أيام للخلق' },
  12: { en: 'Twelve Imams, twelve months', fr: 'Douze Imams, douze mois', ar: 'اثنا عشر إمامًا، اثنا عشر شهرًا' },
  19: { en: 'Numerical miracle of the Qurʾan', fr: 'Miracle numérique du Coran', ar: 'المعجزة العددية للقرآن' },
  70: { en: 'Surah Yā-Sīn (يس)', fr: 'Sourate Yā-Sīn (يس)', ar: 'سورة يس' },
  99: { en: 'Asmāʾ al-Ḩusnā (Beautiful Names)', fr: 'Asmāʾ al-Ḩusnā (les Beaux Noms)', ar: 'الأسماء الحسنى' },
  114: { en: 'Surahs in the Qurʾan', fr: 'Sourates du Coran', ar: 'سور القرآن' },
  313: { en: 'Companions at Badr', fr: 'Compagnons de Badr', ar: 'أصحاب بدر' },
  786: { en: 'Bismillah value (short form)', fr: 'Valeur de la Bismillah (forme courte)', ar: 'قيمة البسملة (الصيغة المختصرة)' },
};

export const SACRED_DEFAULT: TriText = {
  en: 'Resonates with a divine pattern',
  fr: 'Résonne avec un motif divin',
  ar: 'يتناغم مع نمط إلهي',
};

export interface SacredMatch {
  nearest: number;
  distance: number;
  significance: TriText;
}

export function nearestSacred(kabir: number): SacredMatch {
  const nearest = SACRED_SET.reduce((best, x) => (Math.abs(x - kabir) < Math.abs(best - kabir) ? x : best), SACRED_SET[0]);
  return {
    nearest,
    distance: Math.abs(nearest - kabir),
    significance: SACRED_SIGNIFICANCE[nearest] ?? SACRED_DEFAULT,
  };
}
