/**
 * General Arabic text abjad analysis — the "Calculator" feature.
 *
 * Ported from asrar-mobile's unified pipeline (utils/abjad-unified-pipeline.ts
 * + utils/hadad-core.ts), which is the verified source for this math. Reuses
 * Deftere's own already-verified calculateHadadKabir/calculateSaghir/
 * calculateBurj/zodiacFromBurjIndex (coreCalculations.ts, zodiac.ts) rather
 * than re-deriving them, so this only adds what those don't already cover:
 * per-letter elemental classification, the sirr/wusta/kamal/bast secondary
 * values, and letter-frequency analytics.
 *
 * Note: asrar-mobile also exposes a Maghribi/Mashriqi system toggle, but its
 * own ABJAD_MASHRIQI map is byte-identical to ABJAD_MAGHRIBI (a stub, not a
 * real second system) — so no such toggle is offered here; it would just be
 * a switch that changes nothing.
 */

import { ABJAD_MAGHRIBI } from './abjad-maps';
import { calculateHadadKabir, calculateSaghir, calculateBurj, normalizeArabic } from './coreCalculations';
import { zodiacFromBurjIndex, type ZodiacIdentity } from './zodiac';

/** Matches the lowercase element keys used by BurujProfile.element / ELEMENT_NAME in buruj.ts. */
export type ElementType = 'fire' | 'water' | 'air' | 'earth';

export const ELEMENT_EMOJI: Record<ElementType, string> = {
  fire: '🔥',
  water: '💧',
  air: '🌬️',
  earth: '🌍',
};

/** Maghribi elemental classification — 7 letters per element (ʿIlm al-Ḥurūf). Hamza/alif-maqṣūra variants map to their base letter's element. */
const LETTER_ELEMENTS: Record<string, ElementType> = {
  ا: 'fire', أ: 'fire', إ: 'fire', آ: 'fire', ه: 'fire', ط: 'fire', م: 'fire', ف: 'fire', ش: 'fire', ذ: 'fire',
  ب: 'air', و: 'air', ؤ: 'air', ي: 'air', ى: 'air', ئ: 'air', ن: 'air', ض: 'air', ظ: 'air', غ: 'air',
  ج: 'water', ز: 'water', ك: 'water', س: 'water', ق: 'water', ث: 'water', خ: 'water',
  د: 'earth', ح: 'earth', ل: 'earth', ع: 'earth', ر: 'earth', ص: 'earth', ت: 'earth', ة: 'earth',
};

function elementOfLetter(ch: string): ElementType {
  return LETTER_ELEMENTS[ch] ?? 'earth';
}

/** Ḥadad remainder → element. 0=Water, 1=Fire, 2=Earth, 3=Air. */
function hadathToElement(r: number): ElementType {
  return (['water', 'fire', 'earth', 'air'] as const)[r] ?? 'water';
}

export interface LetterFrequencyEntry {
  letter: string;
  count: number;
  value: number;
  element: ElementType;
}

export interface ElementalComposition {
  counts: Record<ElementType, number>;
  percents: Record<ElementType, number>;
  totalLetters: number;
  dominantElement: ElementType | null;
  weakestElement: ElementType | null;
  balanceScore: number;
}

export interface TextProfile {
  normalizedText: string;
  kabir: number;
  saghir: number;
  hadad: number;
  element: ElementType;
  burjIndex: number;
  zodiac: ZodiacIdentity | null;
  sirr: number;
  wusta: number;
  kamal: number;
  bast: number;
  elemental: ElementalComposition;
  letterFrequency: LetterFrequencyEntry[];
}

function analyzeElementalComposition(text: string): { composition: ElementalComposition; frequencies: LetterFrequencyEntry[] } {
  const letterMap = new Map<string, { count: number; value: number; element: ElementType }>();

  for (const char of text) {
    if (!LETTER_ELEMENTS[char]) continue;
    const value = ABJAD_MAGHRIBI[char] ?? 0;
    const element = elementOfLetter(char);
    const existing = letterMap.get(char);
    letterMap.set(char, existing ? { ...existing, count: existing.count + 1 } : { count: 1, value, element });
  }

  const frequencies: LetterFrequencyEntry[] = Array.from(letterMap.entries())
    .map(([letter, data]) => ({ letter, ...data }))
    .sort((a, b) => b.count - a.count);

  const counts: Record<ElementType, number> = { fire: 0, water: 0, air: 0, earth: 0 };
  let totalLetters = 0;
  for (const f of frequencies) {
    counts[f.element] += f.count;
    totalLetters += f.count;
  }

  const pct = (n: number) => (totalLetters > 0 ? Math.round((n / totalLetters) * 100) : 0);
  const percents: Record<ElementType, number> = {
    fire: pct(counts.fire),
    water: pct(counts.water),
    air: pct(counts.air),
    earth: pct(counts.earth),
  };

  const ranked = (Object.entries(percents) as [ElementType, number][]).sort((a, b) => b[1] - a[1]);
  const dominantElement = totalLetters > 0 ? ranked[0][0] : null;
  const weakestElement = totalLetters > 0 ? ranked.find(([, p]) => p === 0)?.[0] ?? null : null;

  // Balance score: 100 when all four elements sit at the ideal 25% share, falling
  // off with their standard deviation from that ideal (0 when one element is 100%).
  const ideal = 25;
  const variance = Object.values(percents).reduce((sum, p) => sum + (p - ideal) ** 2, 0) / 4;
  const balanceScore = totalLetters > 0 ? Math.max(0, Math.min(100, Math.round(100 - Math.sqrt(variance) * 2.3))) : 0;

  return {
    composition: { counts, percents, totalLetters, dominantElement, weakestElement, balanceScore },
    frequencies,
  };
}

export function analyzeText(rawText: string): TextProfile | null {
  const normalizedText = normalizeArabic(rawText);
  if (!normalizedText) return null;

  const kabir = calculateHadadKabir(normalizedText, ABJAD_MAGHRIBI);
  const saghir = calculateSaghir(kabir);
  const hadad = kabir % 4;
  const element = hadathToElement(hadad);
  const burjIndex = calculateBurj(kabir);
  const zodiac = zodiacFromBurjIndex(burjIndex);

  const { composition, frequencies } = analyzeElementalComposition(normalizedText);

  return {
    normalizedText,
    kabir,
    saghir,
    hadad,
    element,
    burjIndex,
    zodiac,
    sirr: kabir - saghir,
    wusta: Math.floor((kabir + saghir) / 2),
    kamal: kabir + saghir,
    bast: kabir * saghir,
    elemental: composition,
    letterFrequency: frequencies,
  };
}
