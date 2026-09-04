/**
 * Book catalog — sample placeholder entries for the Manuscript Marketplace
 * layout, pending the cheikh's answers to spec §2/§8.3 (real titles,
 * languages, formats, pricing, and download-vs-reader rights).
 *
 * "Kanzul Mikban" and "The Master of Geomancy" ship with real cover art as
 * example listings to demonstrate the card layout with a photo instead of
 * the generated placeholder. Their credited author, "Sheikh Abdul Basit
 * Bayan," has not been confirmed as Cherno Moussa Yero Sy or affiliated
 * with him — flag this before treating them as real inventory rather than
 * design examples. The remaining entries have no cover art and render the
 * generated placeholder pattern.
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
    id: 'kanzul-mikban',
    title: {
      en: 'Kanzul Mikban (The Knowledge of Geomancy)',
      fr: 'Kanzul Mikban (Le savoir de la géomancie)',
      ar: 'كنز المكبان (علم الرمل)',
    },
    metadata: {
      en: 'Sheikh Abdul Basit Bayan · Example listing',
      fr: 'Cheikh Abdul Basit Bayan · Fiche d\'exemple',
      ar: 'الشيخ عبد الباسط بيان · قائمة توضيحية',
    },
    description: {
      en: 'Sample marketplace listing showing the manuscript card layout with real cover art. Not yet confirmed as part of the cheikh\'s manuscript inventory (spec §2).',
      fr: 'Fiche d\'exemple illustrant la mise en page des cartes avec une vraie couverture. Pas encore confirmée comme faisant partie de l\'inventaire des manuscrits du cheikh (spec §2).',
      ar: 'قائمة توضيحية للسوق تُظهر تصميم البطاقة بغلاف حقيقي. لم يتم بعد تأكيد انتمائها لجرد مخطوطات الشيخ (البند §2 من المواصفات).',
    },
    language: ['ar', 'en'],
    priceDisplay: '$4.00 USD',
    priceXOF: null,
    coverUrl: '/books/kanzul-mikban.jpg',
    coverSeed: 0,
  },
  {
    id: 'master-of-geomancy',
    title: {
      en: 'The Master of Geomancy',
      fr: 'Le maître de la géomancie',
      ar: 'شيخ علم الرمل',
    },
    metadata: {
      en: 'Sheikh Abdul Basit Bayan · Example listing',
      fr: 'Cheikh Abdul Basit Bayan · Fiche d\'exemple',
      ar: 'الشيخ عبد الباسط بيان · قائمة توضيحية',
    },
    description: {
      en: 'Sample marketplace listing showing the manuscript card layout with real cover art. Not yet confirmed as part of the cheikh\'s manuscript inventory (spec §2).',
      fr: 'Fiche d\'exemple illustrant la mise en page des cartes avec une vraie couverture. Pas encore confirmée comme faisant partie de l\'inventaire des manuscrits du cheikh (spec §2).',
      ar: 'قائمة توضيحية للسوق تُظهر تصميم البطاقة بغلاف حقيقي. لم يتم بعد تأكيد انتمائها لجرد مخطوطات الشيخ (البند §2 من المواصفات).',
    },
    language: ['ar', 'en'],
    priceDisplay: '$4.50 USD',
    priceXOF: null,
    coverUrl: '/books/master-of-geomancy.jpg',
    coverSeed: 1,
  },
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
