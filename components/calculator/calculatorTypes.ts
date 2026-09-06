import { User, FileText, Hand, Type, Sparkles, BookOpen } from 'lucide-react';

/**
 * Plain data shared between the (client) browse list, the (client) form,
 * and the (server) [type] page's generateStaticParams. Kept in a module
 * with no 'use client' directive — importing a plain export from a
 * client-marked file into server code (e.g. generateStaticParams calling
 * .map() on it) breaks the RSC build, so this data lives here instead.
 */

export type CalculationType = 'name' | 'phrase' | 'dhikr' | 'general' | 'divineResonance' | 'quranicResonance';

export const ALL_CALCULATION_TYPES: CalculationType[] = [
  'name',
  'phrase',
  'dhikr',
  'general',
  'divineResonance',
  'quranicResonance',
];

/** Types that need both a person's name and a mother's name, vs. the single-field types below. */
export const TWO_NAME_TYPES: CalculationType[] = ['divineResonance', 'quranicResonance'];

export type CategoryKey = 'textAnalysis' | 'divine' | 'quran';

export const CATEGORIES: { key: CategoryKey; Icon: typeof User; labelKey: string }[] = [
  { key: 'textAnalysis', Icon: FileText, labelKey: 'categoryTextAnalysis' },
  { key: 'divine', Icon: Sparkles, labelKey: 'categoryDivine' },
  { key: 'quran', Icon: BookOpen, labelKey: 'categoryQuran' },
];

export const CALCULATION_TYPES: {
  type: CalculationType;
  Icon: typeof User;
  titleKey: string;
  subtitleKey: string;
  category: CategoryKey;
}[] = [
  { type: 'name', Icon: User, titleKey: 'typeName', subtitleKey: 'typeNameSubtitle', category: 'textAnalysis' },
  { type: 'phrase', Icon: FileText, titleKey: 'typePhrase', subtitleKey: 'typePhraseSubtitle', category: 'textAnalysis' },
  { type: 'general', Icon: Type, titleKey: 'typeGeneral', subtitleKey: 'typeGeneralSubtitle', category: 'textAnalysis' },
  { type: 'dhikr', Icon: Hand, titleKey: 'typeDhikr', subtitleKey: 'typeDhikrSubtitle', category: 'divine' },
  {
    type: 'divineResonance',
    Icon: Sparkles,
    titleKey: 'typeDivineResonance',
    subtitleKey: 'typeDivineResonanceSubtitle',
    category: 'divine',
  },
  {
    type: 'quranicResonance',
    Icon: BookOpen,
    titleKey: 'typeQuranicResonance',
    subtitleKey: 'typeQuranicResonanceSubtitle',
    category: 'quran',
  },
];
