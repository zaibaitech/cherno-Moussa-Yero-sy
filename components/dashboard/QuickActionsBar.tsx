import { getLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';

type Locale = 'en' | 'fr' | 'ar';

export async function QuickActionsBar() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('quickActions');

  const items = [
    { href: `/${locale}/compatibility`, label: t('compatibility') },
    { href: `/${locale}/calculator`, label: t('calculator') },
    { href: `/${locale}/istikhara`, label: t('istikhara') },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {items.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="flex min-h-[42px] items-center justify-center rounded-xl border border-gold/30 bg-navy-card px-2 py-1.5 text-center text-xs font-medium leading-tight text-gold"
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
