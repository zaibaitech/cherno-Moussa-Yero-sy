/**
 * Divine Name Resonance — the 28-letter Abjad-cycle correspondence, distinct
 * from the nearest-numerical-value Divine Name matching used elsewhere in
 * the calculator (lib/abjad/divineNames.ts). Ported from asrar-mobile:
 * features/name-destiny/services/divineResonance.ts, which is the verified
 * source for both the 28-entry table and the index formula.
 *
 * Algorithm (unchanged from source): reduce the name's Kabīr total into a
 * 1-28 index (28 = the number of letters in the Arabic alphabet), then look
 * up the letter/Divine Name traditionally associated with that position in
 * the cycle. This is a different traditional method from the 99-Names
 * proximity matching — kept separate rather than merged, since conflating
 * the two would misrepresent which rule produced which result.
 *
 * The `translation` field's fr/ar values are short glosses added here
 * (the source only carried English + an i18n key this app doesn't share);
 * `letter`/`name`/`nameTashkeel` are Arabic script and locale-independent.
 */

import { ABJAD_MAGHRIBI } from './abjad-maps';
import { calculateHadadKabir, getLetterBreakdown, normalizeArabic, type LetterValue } from './coreCalculations';
import type { TriText } from './buruj';

export interface DivineResonanceEntry {
  letter: string;
  name: string;
  nameTashkeel: string;
  transliteration: string;
  translation: TriText;
}

export interface DivineResonanceResult {
  normalizedText: string;
  breakdown: LetterValue[];
  total: number;
  index: number;
  entry: DivineResonanceEntry;
  dhikrCount: number;
}

/** 28-entry table, indexed 1-28 by resonance index — ported verbatim from asrar-mobile. */
export const DIVINE_RESONANCE_TABLE: Record<number, DivineResonanceEntry> = {
  1: { letter: 'ا', name: 'الله', nameTashkeel: 'اللهُ', transliteration: 'Allah', translation: { en: 'The God, The One True God', fr: 'Dieu, le Dieu unique et véritable', ar: 'الله، الإله الحق الواحد' } },
  2: { letter: 'ب', name: 'باقٍ', nameTashkeel: 'بَاقٍ', transliteration: 'Al-Bāqī', translation: { en: 'The Everlasting, The Eternal', fr: "L'Éternel, l'Immuable", ar: 'الباقي الدائم الذي لا يفنى' } },
  3: { letter: 'ج', name: 'جامع', nameTashkeel: 'جَامِعٌ', transliteration: 'Al-Jāmiʿ', translation: { en: 'The Gatherer, The Uniter', fr: "Celui qui rassemble, l'Unificateur", ar: 'الجامع لكل شيء' } },
  4: { letter: 'د', name: 'دائم', nameTashkeel: 'دَائِمٌ', transliteration: 'Ad-Dāʾim', translation: { en: 'The Eternal, The Everlasting', fr: "Le Permanent, l'Éternel", ar: 'الدائم الذي لا يزول' } },
  5: { letter: 'ه', name: 'هادي', nameTashkeel: 'هَادِي', transliteration: 'Al-Hādī', translation: { en: 'The Guide, The One Who Guides', fr: 'Le Guide, Celui qui guide', ar: 'الهادي الذي يرشد إلى الحق' } },
  6: { letter: 'و', name: 'ودود', nameTashkeel: 'وَدُودٌ', transliteration: 'Al-Wadūd', translation: { en: 'The Loving, The Most Affectionate', fr: "L'Aimant, le Très Affectueux", ar: 'الودود المحب لعباده' } },
  7: { letter: 'ز', name: 'زكي', nameTashkeel: 'زَكِيٌّ', transliteration: 'Az-Zakī', translation: { en: 'The Pure, The Immaculate', fr: "Le Pur, l'Immaculé", ar: 'الزكي الطاهر النقي' } },
  8: { letter: 'ح', name: 'حكيم', nameTashkeel: 'حَكِيمٌ', transliteration: 'Al-Ḥakīm', translation: { en: 'The Wise, The All-Wise', fr: 'Le Sage, le Très Sage', ar: 'الحكيم المصيب في تدبيره' } },
  9: { letter: 'ط', name: 'طاهر', nameTashkeel: 'طَاهِرٌ', transliteration: 'Aṭ-Ṭāhir', translation: { en: 'The Purifier, The Pure One', fr: 'Le Purificateur, le Pur', ar: 'الطاهر المنزّه عن كل نقص' } },
  10: { letter: 'ي', name: 'يقين', nameTashkeel: 'يَقِينٌ', transliteration: 'Al-Yaqīn', translation: { en: 'The Certain, The Certainty', fr: 'Le Certain, la Certitude', ar: 'اليقين الثابت الذي لا شك فيه' } },
  11: { letter: 'ك', name: 'كريم', nameTashkeel: 'كَرِيمٌ', transliteration: 'Al-Karīm', translation: { en: 'The Generous, The Most Bountiful', fr: 'Le Généreux, le Très Généreux', ar: 'الكريم كثير الخير والعطاء' } },
  12: { letter: 'ل', name: 'لطيف', nameTashkeel: 'لَطِيفٌ', transliteration: 'Al-Laṭīf', translation: { en: 'The Subtle, The Most Kind', fr: 'Le Subtil, le Bienveillant', ar: 'اللطيف الرفيق بعباده' } },
  13: { letter: 'م', name: 'مؤمن', nameTashkeel: 'مُؤْمِنٌ', transliteration: 'Al-Muʾmin', translation: { en: 'The Believer, The Giver of Faith', fr: 'Celui qui donne la foi et la sécurité', ar: 'المؤمن مانح الأمن والإيمان' } },
  14: { letter: 'ن', name: 'نور', nameTashkeel: 'نُورٌ', transliteration: 'An-Nūr', translation: { en: 'The Light, The Illuminator', fr: "La Lumière, l'Illuminateur", ar: 'النور الهادي المنير' } },
  15: { letter: 'س', name: 'سلام', nameTashkeel: 'سَلَامٌ', transliteration: 'As-Salām', translation: { en: 'The Peace, The Source of Peace', fr: 'La Paix, la Source de la paix', ar: 'السلام مصدر السلام' } },
  16: { letter: 'ع', name: 'عليم', nameTashkeel: 'عَلِيمٌ', transliteration: 'Al-ʿAlīm', translation: { en: 'The All-Knowing, The Omniscient', fr: "L'Omniscient", ar: 'العليم بكل شيء' } },
  17: { letter: 'ف', name: 'فرد', nameTashkeel: 'فَرْدٌ', transliteration: 'Al-Fard', translation: { en: 'The Unique, The One and Only', fr: 'L\'Unique, le Seul', ar: 'الفرد الواحد الذي لا نظير له' } },
  18: { letter: 'ص', name: 'صبور', nameTashkeel: 'صَبُورٌ', transliteration: 'Aṣ-Ṣabūr', translation: { en: 'The Patient, The Most Forbearing', fr: 'Le Patient, le Très Longanime', ar: 'الصبور الذي لا يعاجل بالعقوبة' } },
  19: { letter: 'ق', name: 'قادر', nameTashkeel: 'قَادِرٌ', transliteration: 'Al-Qādir', translation: { en: 'The Able, The All-Powerful', fr: 'Le Capable, le Tout-Puissant', ar: 'القادر على كل شيء' } },
  20: { letter: 'ر', name: 'رحمن', nameTashkeel: 'رَحْمَنٌ', transliteration: 'Ar-Raḥmān', translation: { en: 'The Most Merciful, The Beneficent', fr: 'Le Tout Miséricordieux', ar: 'الرحمن الرحيم بجميع خلقه' } },
  21: { letter: 'ش', name: 'شكور', nameTashkeel: 'شَكُورٌ', transliteration: 'Ash-Shakūr', translation: { en: 'The Grateful, The Appreciative', fr: "Le Reconnaissant, l'Appréciateur", ar: 'الشكور الذي يجازي على القليل بالكثير' } },
  22: { letter: 'ت', name: 'تواب', nameTashkeel: 'تَوَّابٌ', transliteration: 'At-Tawwāb', translation: { en: 'The Acceptor of Repentance', fr: 'Celui qui accueille le repentir', ar: 'التواب الذي يقبل توبة عباده' } },
  23: { letter: 'ث', name: 'ثابت', nameTashkeel: 'ثَابِتٌ', transliteration: 'Ath-Thābit', translation: { en: 'The Firm, The Steadfast', fr: "Le Ferme, l'Inébranlable", ar: 'الثابت الذي لا يتغير' } },
  24: { letter: 'خ', name: 'خبير', nameTashkeel: 'خَبِيرٌ', transliteration: 'Al-Khabīr', translation: { en: 'The Aware, The All-Informed', fr: 'L\'Informé, le Bien Instruit', ar: 'الخبير بحقائق الأمور' } },
  25: { letter: 'ذ', name: 'ذو الجلال والإكرام', nameTashkeel: 'ذُو الْجَلَالِ وَالْإِكْرَامِ', transliteration: 'Dhul-Jalāli wal-Ikrām', translation: { en: 'The Lord of Majesty and Bounty', fr: 'Le Maître de la majesté et de la générosité', ar: 'ذو الجلال والإكرام صاحب العظمة والكرم' } },
  26: { letter: 'ض', name: 'ضار', nameTashkeel: 'ضَارٌّ', transliteration: 'Aḍ-Ḍārr', translation: { en: 'The Distresser, The Corrector', fr: "Celui qui corrige par l'épreuve", ar: 'الضار الذي يقدّر الضر بحكمته' } },
  27: { letter: 'ظ', name: 'ظاهر', nameTashkeel: 'ظَاهِرٌ', transliteration: 'Aẓ-Ẓāhir', translation: { en: 'The Manifest, The Evident', fr: "Le Manifeste, l'Évident", ar: 'الظاهر الذي ظهر فوق كل شيء' } },
  28: { letter: 'غ', name: 'غني', nameTashkeel: 'غَنِيٌّ', transliteration: 'Al-Ghanī', translation: { en: 'The Rich, The Self-Sufficient', fr: "Le Riche, l'Autosuffisant", ar: 'الغني الذي لا يحتاج إلى أحد' } },
};

/**
 * Compute Divine Name Resonance for a name — reduces its Kabīr total to a
 * 1-28 index (0 mod 28 maps to 28, not 0) and looks up the corresponding
 * entry. Returns null rather than throwing when the text has no valid
 * Arabic letters, matching this app's other calculators' null-on-empty
 * convention instead of the source's throw-based one.
 */
export function computeDivineResonance(
  name: string,
  abjadMap: Record<string, number> = ABJAD_MAGHRIBI
): DivineResonanceResult | null {
  const normalizedText = normalizeArabic(name);
  if (!normalizedText) return null;

  const breakdown = getLetterBreakdown(normalizedText, abjadMap);
  if (breakdown.length === 0) return null;

  const total = calculateHadadKabir(normalizedText, abjadMap);

  let index: number;
  if (total < 28) {
    index = total;
  } else {
    index = total % 28;
    if (index === 0) index = 28;
  }
  // total < 28 can still legitimately be 0 only if every char had value 0, already excluded above;
  // guard the edge case of index 0 for very short/low-value names.
  if (index === 0) index = 28;

  const entry = DIVINE_RESONANCE_TABLE[index];
  const dhikrCount = calculateHadadKabir(entry.name, abjadMap);

  return { normalizedText, breakdown, total, index, entry, dhikrCount };
}
