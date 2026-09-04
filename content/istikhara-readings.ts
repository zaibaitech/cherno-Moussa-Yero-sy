/**
 * Istikhara result content, per zodiac sign.
 *
 * PLACEHOLDER CONTENT — pending digitization/transcription of Cherno Moussa
 * Yero Sy's manuscripts (spec §2). Do NOT reuse Asrariya's existing
 * Sadaqah/"Who Am I" content here: that corpus is authorized by a different
 * scholar (Cheikh Mahdiyou Niane — see data/zodiacSadaqahData.ts in
 * asrar-mobile), so it carries someone else's attribution and cannot be
 * relicensed into this app (spec §1, §8.6). Every entry below must be
 * replaced with material sourced from and attributed to Cherno Moussa Yero
 * Sy before this ships.
 */

import type { ZodiacKey } from '@/lib/abjad/zodiac';

export interface TrilingualText {
  en: string;
  fr: string;
  ar: string;
}

export interface IstikharaReading {
  sign: ZodiacKey;
  summary: TrilingualText;
  guidance: TrilingualText;
  authorizedBy: string;
}

const PLACEHOLDER: TrilingualText = {
  en: 'This reading is awaiting content from the cheikh\'s manuscript. Placeholder text only.',
  fr: "Cette lecture attend le contenu du manuscrit du cheikh. Texte provisoire uniquement.",
  ar: 'هذه القراءة بانتظار محتوى من مخطوطة الشيخ. نص مؤقت فقط.',
};

const SIGNS: ZodiacKey[] = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
];

export const ISTIKHARA_READINGS: Record<ZodiacKey, IstikharaReading> = Object.fromEntries(
  SIGNS.map((sign) => [
    sign,
    {
      sign,
      summary: PLACEHOLDER,
      guidance: PLACEHOLDER,
      authorizedBy: 'Cherno Moussa Yero Sy',
    },
  ])
) as Record<ZodiacKey, IstikharaReading>;
