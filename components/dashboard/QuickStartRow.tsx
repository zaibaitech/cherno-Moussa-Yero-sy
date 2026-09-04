import { getLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Sparkles, Calculator } from 'lucide-react';

export async function QuickStartRow() {
  const locale = await getLocale();
  const t = await getTranslations('nav');

  const items = [
    { href: `/${locale}/istikhara`, label: t('istikhara'), Icon: Sparkles },
    { href: `/${locale}/calculator`, label: t('calculator'), Icon: Calculator },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map(({ href, label, Icon }) => (
        <Link
          key={href}
          href={href}
          className="flex items-center gap-2 rounded-2xl border border-gold/20 bg-navy-card p-3 text-sm text-slate-100"
        >
          <Icon size={18} className="text-gold" aria-hidden />
          {label}
        </Link>
      ))}
    </div>
  );
}
