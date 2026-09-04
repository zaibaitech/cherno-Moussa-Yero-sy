import { getLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { BookMarked } from 'lucide-react';
import { BOOKS } from '@/content/books';
import { Bookshelf } from './Bookshelf';

type Locale = 'en' | 'fr' | 'ar';

const COVER_GRADIENTS = [
  'from-amber-900 via-amber-800 to-navy',
  'from-rose-950 via-amber-900 to-navy',
  'from-stone-800 via-amber-950 to-navy',
];

/**
 * No real manuscript cover art exists yet — each card renders a generated
 * "leather-bound" placeholder (spine + embossed frame) instead of a photo.
 * Swap for real scans once available.
 */
function PlaceholderCover({ seed }: { seed: number }) {
  const gradient = COVER_GRADIENTS[seed % COVER_GRADIENTS.length];
  return (
    <div className={`relative flex h-12 w-full overflow-hidden rounded-lg bg-gradient-to-br ${gradient} border border-gold/20`}>
      <div className="h-full w-2 shrink-0 bg-black/30" />
      <div className="m-1 flex flex-1 items-center justify-center rounded-sm border border-gold/25">
        <BookMarked size={16} className="text-gold/60" aria-hidden />
      </div>
    </div>
  );
}

export async function ManuscriptMarketplace() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('marketplace');

  if (BOOKS.length === 0) return null;

  return (
    <section>
      <h2 className="text-sm font-semibold text-gold">{t('title')}</h2>
      <p className="mb-1.5 text-[11px] text-slate-400">{t('subtitle')}</p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {BOOKS.map((book) => (
          <div key={book.id} className="w-32 shrink-0 rounded-2xl border border-white/5 bg-navy-card p-2">
            <PlaceholderCover seed={book.coverSeed} />
            <p className="mt-1 truncate text-sm font-medium text-slate-100">{book.title[locale]}</p>
            <p className="truncate text-[11px] text-slate-500">{book.metadata[locale]}</p>
            <p className="text-sm font-semibold text-gold">{book.priceDisplay}</p>
            <Link
              href={`/${locale}/books`}
              className="mt-1 block rounded-lg border border-gold/40 px-2 py-1 text-center text-xs font-medium text-gold"
            >
              {t('viewDetail')}
            </Link>
          </div>
        ))}
      </div>
      <Bookshelf />
    </section>
  );
}
