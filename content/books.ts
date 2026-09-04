/**
 * Book catalog — sample placeholder entries for the Manuscript Marketplace
 * layout, pending the cheikh's answers to spec §2/§8.3 (real titles,
 * languages, formats, pricing, and download-vs-reader rights). No cover art
 * exists yet — cards render a generated pattern instead of a real scan;
 * swap in real manuscript photography before shipping.
 */

export interface Book {
  id: string;
  title: Record<'en' | 'fr' | 'ar', string>;
  metadata: Record<'en' | 'fr' | 'ar', string>;
  description: Record<'en' | 'fr' | 'ar', string>;
  language: Array<'en' | 'fr' | 'ar'>;
  priceDisplay: string; // e.g. "$2.50 USD" — placeholder display price, not wired to checkout yet
  priceXOF: number | null; // null = free/preview; real Wave amount once §8.3 is answered
  coverUrl: string | null; // null = render the generated placeholder cover
  coverSeed: number; // picks a placeholder cover pattern (0-2)
}

export const BOOKS: Book[] = [
  {
    id: 'al-kitab-al-manzum',
    title: { en: 'Al-Kitab al-Manzum', fr: 'Al-Kitab al-Manzum', ar: 'الكتاب المنظوم' },
    metadata: {
      en: 'Author N · Region TBD',
      fr: 'Auteur N · Région à confirmer',
      ar: 'المؤلف N · المنطقة قيد التحديد',
    },
    description: {
      en: 'Placeholder listing pending the cheikh\'s manuscript inventory (spec §2).',
      fr: 'Fiche provisoire en attente de l\'inventaire des manuscrits du cheikh (spec §2).',
      ar: 'قائمة مؤقتة بانتظار جرد مخطوطات الشيخ (البند §2 من المواصفات).',
    },
    language: ['ar'],
    priceDisplay: '$2.50 USD',
    priceXOF: null,
    coverUrl: null,
    coverSeed: 0,
  },
  {
    id: 'codex-deftere',
    title: { en: 'Codex Deftere', fr: 'Codex Deftere', ar: 'مخطوطة دفتره' },
    metadata: {
      en: 'Parchment · Region TBD',
      fr: 'Parchemin · Région à confirmer',
      ar: 'رَق · المنطقة قيد التحديد',
    },
    description: {
      en: 'Placeholder listing pending the cheikh\'s manuscript inventory (spec §2).',
      fr: 'Fiche provisoire en attente de l\'inventaire des manuscrits du cheikh (spec §2).',
      ar: 'قائمة مؤقتة بانتظار جرد مخطوطات الشيخ (البند §2 من المواصفات).',
    },
    language: ['ar', 'fr'],
    priceDisplay: '$3.00 USD',
    priceXOF: null,
    coverUrl: null,
    coverSeed: 1,
  },
  {
    id: 'majmu-al-fawaid',
    title: { en: "Majmu' al-Fawa'id", fr: "Majmu' al-Fawa'id", ar: 'مجموع الفوائد' },
    metadata: {
      en: 'Leather-bound · Region TBD',
      fr: 'Relié cuir · Région à confirmer',
      ar: 'مجلد بالجلد · المنطقة قيد التحديد',
    },
    description: {
      en: 'Placeholder listing pending the cheikh\'s manuscript inventory (spec §2).',
      fr: 'Fiche provisoire en attente de l\'inventaire des manuscrits du cheikh (spec §2).',
      ar: 'قائمة مؤقتة بانتظار جرد مخطوطات الشيخ (البند §2 من المواصفات).',
    },
    language: ['ar'],
    priceDisplay: '3.00 USDT',
    priceXOF: null,
    coverUrl: null,
    coverSeed: 2,
  },
];
