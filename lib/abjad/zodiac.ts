/**
 * Zodiac identity lookup, keyed by the 1-indexed burjIndex returned by
 * calculateBurj() (1=Aries .. 12=Pisces). Ported from asrar-mobile:
 * constants/identityMaps.ts (ZODIAC_IDENTITY_MAP / ZODIAC_KEYS_BY_BURJ_INDEX).
 */

export type ZodiacKey =
  | 'aries' | 'taurus' | 'gemini' | 'cancer' | 'leo' | 'virgo'
  | 'libra' | 'scorpio' | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces';

export interface ZodiacIdentity {
  key: ZodiacKey;
  en: string;
  fr: string;
  ar: string;
  symbol: string;
}

export const ZODIAC_IDENTITY_MAP: Record<ZodiacKey, ZodiacIdentity> = {
  aries: { key: 'aries', en: 'Aries', fr: 'Bélier', ar: 'الحمل', symbol: '♈' },
  taurus: { key: 'taurus', en: 'Taurus', fr: 'Taureau', ar: 'الثور', symbol: '♉' },
  gemini: { key: 'gemini', en: 'Gemini', fr: 'Gémeaux', ar: 'الجوزاء', symbol: '♊' },
  cancer: { key: 'cancer', en: 'Cancer', fr: 'Cancer', ar: 'السرطان', symbol: '♋' },
  leo: { key: 'leo', en: 'Leo', fr: 'Lion', ar: 'الأسد', symbol: '♌' },
  virgo: { key: 'virgo', en: 'Virgo', fr: 'Vierge', ar: 'العذراء', symbol: '♍' },
  libra: { key: 'libra', en: 'Libra', fr: 'Balance', ar: 'الميزان', symbol: '♎' },
  scorpio: { key: 'scorpio', en: 'Scorpio', fr: 'Scorpion', ar: 'العقرب', symbol: '♏' },
  sagittarius: { key: 'sagittarius', en: 'Sagittarius', fr: 'Sagittaire', ar: 'القوس', symbol: '♐' },
  capricorn: { key: 'capricorn', en: 'Capricorn', fr: 'Capricorne', ar: 'الجدي', symbol: '♑' },
  aquarius: { key: 'aquarius', en: 'Aquarius', fr: 'Verseau', ar: 'الدلو', symbol: '♒' },
  pisces: { key: 'pisces', en: 'Pisces', fr: 'Poissons', ar: 'الحوت', symbol: '♓' },
};

/** burjIndex is 1-indexed (1=Aries .. 12=Pisces), matching calculateBurj(). */
const ZODIAC_KEYS_BY_BURJ_INDEX: ZodiacKey[] = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
];

export function zodiacFromBurjIndex(burjIndex: number): ZodiacIdentity | null {
  if (!Number.isFinite(burjIndex)) return null;
  const idx = Math.floor(burjIndex) - 1;
  if (idx < 0 || idx >= ZODIAC_KEYS_BY_BURJ_INDEX.length) return null;
  return ZODIAC_IDENTITY_MAP[ZODIAC_KEYS_BY_BURJ_INDEX[idx]];
}
