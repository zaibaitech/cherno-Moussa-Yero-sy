'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Calculator, Sparkles, Heart, BookOpen } from 'lucide-react';

const ITEMS = [
  { href: '', labelKey: 'home', Icon: Home },
  { href: '/calculator', labelKey: 'calculator', Icon: Calculator },
  { href: '/istikhara', labelKey: 'istikhara', Icon: Sparkles },
  { href: '/compatibility', labelKey: 'compatibility', Icon: Heart },
  { href: '/books', labelKey: 'books', Icon: BookOpen },
] as const;

export function BottomNav() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('nav');

  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 mx-auto max-w-md border-t border-white/5 bg-navy/95 backdrop-blur">
      <ul className="grid grid-cols-5">
        {ITEMS.map(({ href, labelKey, Icon }) => {
          const fullHref = `/${locale}${href}`;
          const isActive = pathname === fullHref;
          return (
            <li key={href}>
              <Link
                href={fullHref}
                className={`flex flex-col items-center gap-1 py-3 text-xs ${
                  isActive ? 'text-gold' : 'text-slate-400'
                }`}
              >
                <Icon size={20} />
                {t(labelKey)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
