/**
 * Book catalog — PLACEHOLDER data pending the cheikh's answers to spec §2/§8.3
 * (titles, languages, formats, pricing, and download-vs-reader rights).
 */

export interface Book {
  id: string;
  title: Record<'en' | 'fr' | 'ar', string>;
  description: Record<'en' | 'fr' | 'ar', string>;
  language: Array<'en' | 'fr' | 'ar'>;
  priceXOF: number | null; // null = free/preview
  coverUrl: string | null;
}

export const BOOKS: Book[] = [];
