/**
 * Buruj profile — the deep, per-sign spiritual/personality/career content
 * for Istikhara, ported from asrar-mobile's data/burujData.json (served via
 * this repo's own content/buruj-data.json, fetched server-side per sign via
 * /api/buruj/[index] to avoid bundling all 12 signs into client JS).
 *
 * Unlike Compatibility, this content has NO explicit named-scholar
 * attribution anywhere in the source data (verified: no "authorizedBy" or
 * cheikh name in the raw JSON) — different from data/zodiacSadaqahData.ts,
 * which is explicitly attributed to Cheikh Mahdiyou Niane. Confirm with the
 * cheikh whether this is in fact his material before shipping to
 * production; it's rendered here attributed to "Cherno Moussa Yero Sy" per
 * this app's stated identity, but that attribution is an assumption on our
 * part, not sourced from the data itself.
 */

export interface TriText {
  en: string;
  fr: string;
  ar: string;
}

interface TriList {
  en: string[];
  fr: string[];
  ar: string[];
}

export interface CareerCategory {
  category: string;
  icon: string;
  items: string[];
}

export interface BurujProfile {
  buruj: number;
  element: string;
  element_emoji: string;
  element_number: number;
  colors: string[];
  personality: {
    en: Record<string, string>;
    fr: Record<string, string>;
    ar: Record<string, string>;
  };
  career: {
    traditional: TriText;
    modern_recommended: { en: CareerCategory[]; fr: CareerCategory[]; ar: CareerCategory[] };
    avoid: { traditional: TriText; modern: TriText };
    principle: TriText;
  };
  blessed_day: {
    day: TriText;
    day_number: number;
    best_for: TriList;
    special_notes: TriList;
  };
  sadaqah: {
    monthly: {
      traditional: TriText;
      frequency: TriText;
      context: TriText;
      purpose: TriText;
      modern_alternatives?: TriList;
    };
    lifetime: {
      traditional: TriText;
      components: TriList;
      best_timing: TriList;
      significance?: TriText;
    };
  };
  spiritual_practice: {
    practice_night: { primary: TriText; note: TriText };
    zodiac_sign: { en: string; fr: string; arabic: string };
    divine_names: { arabic: string; transliteration: string; translation: TriText };
    quranic_verse: { arabic: string; transliteration: string; translation: TriText; reference: string };
    angel: { arabic: string; transliteration: string; name: TriText };
    jinn: { arabic: string; transliteration: string; meaning: TriText };
    instructions: TriList;
  };
}

export type Locale = 'en' | 'fr' | 'ar';

export function pick(locale: Locale, t: TriText): string {
  return t[locale];
}

export function pickList(locale: Locale, t: TriList): string[] {
  return t[locale];
}

export async function fetchBurujProfile(burjIndex: number): Promise<BurujProfile> {
  const res = await fetch(`/api/buruj/${burjIndex}`);
  if (!res.ok) throw new Error(`Buruj profile ${burjIndex} not found`);
  return res.json();
}

export const PERSONALITY_FIELDS = [
  'temperament',
  'communication',
  'anger',
  'social_loved',
  'social_challenge',
  'social_attraction',
  'social_unpopular',
  'dreams',
  'life_blessing',
  'divine_support',
  'challenge',
] as const;

export const PERSONALITY_LABELS: Record<(typeof PERSONALITY_FIELDS)[number], TriText> = {
  temperament: { en: 'Temperament', fr: 'Tempérament', ar: 'المزاج' },
  communication: { en: 'Communication', fr: 'Communication', ar: 'التواصل' },
  anger: { en: 'Anger', fr: 'Colère', ar: 'الغضب' },
  social_loved: { en: 'Loved For', fr: 'Aimé(e) pour', ar: 'محبوب من أجل' },
  social_challenge: { en: 'Social Challenge', fr: 'Défi social', ar: 'التحدي الاجتماعي' },
  social_attraction: { en: 'Naturally Attracts', fr: 'Attire naturellement', ar: 'يجذب بطبيعته' },
  social_unpopular: { en: 'May Be Misunderstood By', fr: 'Peut être incompris(e) par', ar: 'قد يُساء فهمه من قبل' },
  dreams: { en: 'Dreams', fr: 'Rêves', ar: 'الأحلام' },
  life_blessing: { en: 'Life Blessing', fr: 'Bénédiction de vie', ar: 'بركة الحياة' },
  divine_support: { en: 'Divine Support', fr: 'Soutien divin', ar: 'الدعم الإلهي' },
  challenge: { en: 'Life Challenge', fr: 'Défi de vie', ar: 'تحدي الحياة' },
};

export const SECTION_LABELS = {
  overview: { en: 'Overview', fr: "Vue d'ensemble", ar: 'نظرة عامة' },
  personality: { en: 'Personality', fr: 'Personnalité', ar: 'الشخصية' },
  career: { en: 'Career', fr: 'Carrière', ar: 'المسار المهني' },
  blessedDay: { en: 'Blessed Day', fr: 'Jour béni', ar: 'اليوم المبارك' },
  spiritualPractice: { en: 'Spiritual Practice', fr: 'Pratique spirituelle', ar: 'الممارسة الروحية' },
  sadaqah: { en: 'Sadaqah', fr: 'Sadaqah', ar: 'الصدقة' },
} satisfies Record<string, TriText>;

export const NUMBERS_LABELS = {
  title: { en: 'Your Numbers', fr: 'Vos nombres', ar: 'أرقامك' },
  personHadad: { en: "Your Hadad", fr: 'Votre Hadad', ar: 'حدادك' },
  motherHadad: { en: "Mother's Hadad", fr: 'Hadad de la mère', ar: 'حداد الأم' },
  combinedHadad: { en: 'Combined Hadad', fr: 'Hadad combiné', ar: 'الحداد المجموع' },
  lifeNumber: { en: 'Life Number', fr: 'Nombre de vie', ar: 'رقم الحياة' },
} satisfies Record<string, TriText>;

export const ELEMENT_NAME: Record<string, TriText> = {
  fire: { en: 'Fire', fr: 'Feu', ar: 'النار' },
  earth: { en: 'Earth', fr: 'Terre', ar: 'التراب' },
  air: { en: 'Air', fr: 'Air', ar: 'الهواء' },
  water: { en: 'Water', fr: 'Eau', ar: 'الماء' },
};

export const ANGEL_JINN_LABELS = {
  angel: { en: 'Guardian Angel', fr: 'Ange gardien', ar: 'الملَك الحارس' },
  jinn: { en: 'Associated Jinn', fr: 'Jinn associé', ar: 'الجن المرتبط' },
} satisfies Record<string, TriText>;

export const CAREER_LABELS = {
  principle: { en: 'Guiding Principle', fr: 'Principe directeur', ar: 'المبدأ الموجه' },
  traditional: { en: 'Traditional Paths', fr: 'Voies traditionnelles', ar: 'المسارات التقليدية' },
  modern: { en: 'Modern Opportunities', fr: 'Opportunités modernes', ar: 'الفرص الحديثة' },
  avoid: { en: 'Better Avoided', fr: 'À éviter de préférence', ar: 'يُفضَّل تجنبه' },
} satisfies Record<string, TriText>;

export const SADAQAH_LABELS = {
  monthly: { en: 'Monthly Sadaqah', fr: 'Sadaqah mensuelle', ar: 'الصدقة الشهرية' },
  lifetime: { en: 'Lifetime Sadaqah', fr: 'Sadaqah unique', ar: 'الصدقة العمرية' },
  frequency: { en: 'Frequency', fr: 'Fréquence', ar: 'التكرار' },
  purpose: { en: 'Purpose', fr: 'Objectif', ar: 'الغرض' },
  components: { en: 'What It Involves', fr: 'Ce que cela implique', ar: 'ما يتضمنه' },
  bestTiming: { en: 'Best Timing', fr: 'Meilleur moment', ar: 'أفضل توقيت' },
} satisfies Record<string, TriText>;

export const SPIRITUAL_LABELS = {
  practiceNight: { en: 'Practice Night', fr: 'Nuit de pratique', ar: 'ليلة الممارسة' },
  divineName: { en: 'Divine Name', fr: 'Nom Divin', ar: 'الاسم الإلهي' },
  quranicVerse: { en: "Qur'anic Verse", fr: 'Verset coranique', ar: 'الآية القرآنية' },
  angel: { en: 'Angel', fr: 'Ange', ar: 'الملَك' },
  jinn: { en: 'Jinn', fr: 'Jinn', ar: 'الجن' },
  instructions: { en: 'Instructions', fr: 'Instructions', ar: 'التعليمات' },
} satisfies Record<string, TriText>;
