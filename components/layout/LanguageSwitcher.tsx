'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { locales, type Locale } from '@/lib/i18n/config';

const PILL_LABEL: Record<Locale, { text: string; flag: string | null }> = {
  fr: { text: 'FR', flag: '🇫🇷' },
  en: { text: 'EN', flag: '🇬🇧' },
  ar: { text: 'عربي', flag: null },
};

function pathWithoutLocale(pathname: string): string {
  const segments = pathname.split('/');
  const rest = segments.slice(2).join('/');
  return rest ? `/${rest}` : '';
}

export function LanguageSwitcher() {
  const pathname = usePathname();
  const activeLocale = useLocale() as Locale;
  const rest = pathWithoutLocale(pathname);

  return (
    <div className="flex items-center gap-1.5">
      {locales.map((locale) => {
        const isActive = locale === activeLocale;
        const { text, flag } = PILL_LABEL[locale];
        return (
          <Link
            key={locale}
            href={`/${locale}${rest}`}
            className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
              isActive ? 'bg-gold/20 text-gold' : 'bg-white/5 text-slate-400'
            }`}
          >
            {flag && <span aria-hidden>{flag}</span>}
            {text}
          </Link>
        );
      })}
    </div>
  );
}
