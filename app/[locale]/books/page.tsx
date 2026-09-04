import { getLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { BOOKS, type Book } from '@/content/books';
import { WAVE_STATIC_PAY_LINK } from '@/lib/wave';
import { Card } from '@/components/ui/Card';
import { BookOpen, BookMarked } from 'lucide-react';

type Locale = 'en' | 'fr' | 'ar';

const COVER_GRADIENTS = [
  'from-amber-900 via-amber-800 to-navy',
  'from-rose-950 via-amber-900 to-navy',
  'from-stone-800 via-amber-950 to-navy',
];

function Cover({ book, title }: { book: Book; title: string }) {
  if (!book.coverUrl) {
    return (
      <div
        className={`flex h-20 w-16 shrink-0 items-center justify-center rounded-lg border border-gold/20 bg-gradient-to-br ${COVER_GRADIENTS[book.coverSeed % COVER_GRADIENTS.length]}`}
      >
        <BookMarked size={20} className="text-gold/60" aria-hidden />
      </div>
    );
  }
  return (
    <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg border border-gold/20">
      <Image src={book.coverUrl} alt={title} fill sizes="64px" className="object-cover" />
    </div>
  );
}

export default async function BooksPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('books');

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold text-gold">{t('title')}</h1>

      {BOOKS.length === 0 ? (
        <Card className="flex flex-col items-center gap-3 py-10 text-center">
          <BookOpen size={28} className="text-slate-500" aria-hidden />
          <p className="text-sm text-slate-400">{t('empty')}</p>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {BOOKS.map((book) => (
            <Card key={book.id} className="flex gap-3">
              <Cover book={book} title={book.title[locale]} />
              <div className="flex flex-1 flex-col">
                <p className="font-medium text-slate-100">{book.title[locale]}</p>
                <p className="text-xs text-slate-500">{book.metadata[locale]}</p>
                <p className="mt-1 text-sm font-semibold text-gold">{book.priceDisplay}</p>
                <a
                  href={WAVE_STATIC_PAY_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block self-start rounded-xl bg-gold px-4 py-2 text-sm font-medium text-navy"
                >
                  {t('payWithWave')}
                </a>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
