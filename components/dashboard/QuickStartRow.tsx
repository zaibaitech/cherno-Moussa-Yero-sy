import { getLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Sparkles, Calculator, Heart } from 'lucide-react';

export async function QuickStartRow() {
  const locale = await getLocale();
  const t = await getTranslations('nav');

  const items = [
    { href: `/${locale}/istikhara`, label: t('istikhara'), Icon: Sparkles },
    { href: `/${locale}/compatibility`, label: t('compatibility'), Icon: Heart },
    { href: `/${locale}/calculator`, label: t('calculator'), Icon: Calculator },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map(({ href, label, Icon }) => (
        <Link
          key={href}
          href={href}
          className="flex flex-col items-center gap-1.5 rounded-2xl border border-gold/20 bg-navy-card px-2 py-3 text-center text-xs text-slate-100"
        >
          <Icon size={18} className="text-gold" aria-hidden />
          {label}
        </Link>
      ))}
    </div>
  );
}
