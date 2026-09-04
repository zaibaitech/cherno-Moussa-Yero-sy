import { getTranslations } from 'next-intl/server';
import { BOOKS } from '@/content/books';
import { WAVE_STATIC_PAY_LINK } from '@/lib/wave';
import { Card } from '@/components/ui/Card';
import { BookOpen } from 'lucide-react';

export default async function BooksPage() {
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
            <Card key={book.id}>
              <p className="font-medium text-slate-100">{book.title.en}</p>
              <a
                href={WAVE_STATIC_PAY_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block rounded-xl bg-gold px-4 py-2 text-sm font-medium text-navy"
              >
                {t('payWithWave')}
              </a>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
