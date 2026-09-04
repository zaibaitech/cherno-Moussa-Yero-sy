/**
 * Core Abjad calculations — name → ʿIlm al-Ḥurūf → zodiac sign.
 *
 * Ported from the Asrariya "Who Am I" engine (asrar-mobile:
 * utils/coreCalculations.ts), which is the single verified source of truth
 * for this math (spec §0/§3.1). Kept pure/dependency-free on purpose so it
 * stays portable. Do not fork the formulas — only the presentation layer
 * (framing, result content, attribution) is specific to Deftere.
 */

import { ABJAD_MAGHRIBI } from './abjad-maps';

export function normalizeArabic(text: string): string {
  if (!text) return '';
  const normalized = text.replace(/[ًٌٍَُِّْـ]/g, '');
  return normalized.replace(/\s+/g, ' ').trim();
}

export function calculateHadadKabir(
  text: string,
  abjad: Record<string, number> = ABJAD_MAGHRIBI
): number {
  if (!text) return 0;
  const normalized = normalizeArabic(text);
  let total = 0;
  for (const char of normalized) {
    const value = abjad[char];
    if (value) total += value;
  }
  return total;
}

export function calculateSaghir(total: number): number {
  if (total === 0) return 0;
  return 1 + ((total - 1) % 9);
}

/** Element from total, mod 4. Maghribi mapping: 1=Fire, 2=Earth, 3=Air, 4=Water. */
export function calculateTabElement(total: number): 1 | 2 | 3 | 4 {
  const remainder = total % 4;
  return (remainder === 0 ? 4 : remainder) as 1 | 2 | 3 | 4;
}

/** Zodiac (burj) index from total, mod 12, 1-indexed (1=Aries .. 12=Pisces). */
export function calculateBurj(total: number): number {
  const remainder = total % 12;
  return remainder === 0 ? 12 : remainder;
}

export interface DestinyResult {
  personName: string;
  motherName: string;
  personKabir: number;
  motherKabir: number;
  combinedKabir: number;
  saghir: number;
  tabElement: 1 | 2 | 3 | 4;
  personElement: 1 | 2 | 3 | 4;
  motherElement: 1 | 2 | 3 | 4 | null;
  burjIndex: number;
}

export function calculateDestiny(
  personName: string,
  motherName: string = '',
  abjad: Record<string, number> = ABJAD_MAGHRIBI
): DestinyResult {
  const personKabir = calculateHadadKabir(personName, abjad);
  const motherKabir = calculateHadadKabir(motherName, abjad);
  const combinedKabir = personKabir + motherKabir;

  const saghir = calculateSaghir(combinedKabir);
  const tabElement = calculateTabElement(combinedKabir);
  const burjIndex = calculateBurj(combinedKabir);

  const personElement = calculateTabElement(personKabir);
  const motherElement = motherKabir > 0 ? calculateTabElement(motherKabir) : null;

  return {
    personName: normalizeArabic(personName),
    motherName: normalizeArabic(motherName),
    personKabir,
    motherKabir,
    combinedKabir,
    saghir,
    tabElement,
    personElement,
    motherElement,
    burjIndex,
  };
}
