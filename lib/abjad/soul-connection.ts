/**
 * Soul Connection — rich, context-aware content for the mod-9
 * "Spiritual Destiny" result, ported from asrar-mobile:
 *   - services/compatibility/soulArchetypes.ts (severity + tags per number)
 *   - services/compatibility/soulConnectionMeanings.ts (types/shape)
 *   - constants/translations.ts, path `compatibility.soul.*` (actual EN/FR/AR
 *     text — extracted programmatically via a script run against the real
 *     translations object, not hand-transcribed, to avoid copy errors)
 *
 * This is the content the source app actually renders for "Soul Connection"
 * (title, tags, Meaning/Marriage Outlook/Watch Out/Key to Success, per
 * relationship context) — richer than a flat per-remainder description, and
 * distinct from the generic Elemental/Planetary/Daily methods in
 * ./compatibility.ts.
 */

import soulDataRaw from '@/content/soul-connection-data.json';

export type Locale = 'en' | 'fr' | 'ar';
export type SoulNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type RelationshipContext = 'universal' | 'marriage' | 'friendship' | 'family' | 'work';
export type Intensity = 'positive' | 'mixed' | 'challenging';
export type Severity = 'green' | 'amber' | 'red';

interface TriText {
  en: string;
  fr: string;
  ar: string;
}

const soulData = soulDataRaw as {
  title: TriText;
  subtitle: TriText;
  independentChip: TriText;
  disclaimer: TriText;
  blocks: { meaning: TriText; marriageOutlook: TriText; watchOut: TriText; keyToSuccess: TriText };
  howCalculated: { title: TriText; constant: TriText; explanation: TriText };
  archetypes: Record<
    string,
    { title: TriText; oneLine: TriText; meaning: TriText; marriageOutlook: TriText; watchOut: TriText; keyToSuccess: TriText }
  >;
  tags: Record<string, TriText>;
  meanings: Record<
    'universal' | 'friendship' | 'family' | 'work',
    Record<string, { short: TriText; meaning: TriText; watchOut: TriText; keyToSuccess: TriText }>
  >;
};

export function pick(locale: Locale, text: TriText): string {
  return text[locale];
}

export { soulData };

// Ported verbatim from asrar-mobile: services/compatibility/soulArchetypes.ts
export const SOUL_SEVERITY: Record<SoulNumber, Severity> = {
  1: 'amber', 2: 'green', 3: 'red', 4: 'red', 5: 'green', 6: 'red', 7: 'green', 8: 'green', 9: 'red',
};

export const SOUL_TAGS: Record<SoulNumber, string[]> = {
  1: ['grounded', 'stability', 'renewal'],
  2: ['harmony', 'cooperation', 'companionship'],
  3: ['friction', 'patience', 'discipline'],
  4: ['burden', 'health', 'maturity'],
  5: ['blessed', 'growth', 'gratitude'],
  6: ['trial', 'forgiveness', 'selfWork'],
  7: ['chosen', 'blessed', 'alignment'],
  8: ['patience', 'longTerm', 'wisdom'],
  9: ['caution', 'guidance', 'protection'],
};

const INTENSITY_COLOR: Record<Intensity, string> = { positive: '#22c55e', mixed: '#f59e0b', challenging: '#ef4444' };
const SEVERITY_COLOR: Record<Severity, string> = { green: '#22c55e', amber: '#f59e0b', red: '#ef4444' };

export function getSeverityColor(n: SoulNumber): string {
  return SEVERITY_COLOR[SOUL_SEVERITY[n]];
}

export function getIntensityColor(intensity: Intensity): string {
  return INTENSITY_COLOR[intensity];
}

export function getArchetype(n: SoulNumber) {
  return soulData.archetypes[String(n)];
}

export function getContextMeaning(n: SoulNumber, context: 'universal' | 'friendship' | 'family' | 'work') {
  return soulData.meanings[context]?.[String(n)];
}

/**
 * Relationship-context tab labels. The source app is missing a French
 * translation for these (falls back silently) — filled in here since it's
 * a trivial UI label, not attributed content.
 */
export const RELATIONSHIP_CONTEXT_LABELS: Record<RelationshipContext, TriText> = {
  universal: { en: 'Universal', fr: 'Universel', ar: 'عام' },
  marriage: { en: 'Marriage', fr: 'Mariage', ar: 'زواج' },
  friendship: { en: 'Friendship', fr: 'Amitié', ar: 'صداقة' },
  family: { en: 'Family', fr: 'Famille', ar: 'عائلة' },
  work: { en: 'Work', fr: 'Travail', ar: 'عمل' },
};

export const RELATIONSHIP_CONTEXT_TITLE: TriText = {
  en: 'Relationship Context',
  fr: 'Contexte relationnel',
  ar: 'سياق العلاقة',
};
