'use client';

import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

/**
 * Shows "Ilm al-Nujum" here only on the dashboard (home) route — it's the
 * dashboard's own section heading, moved up into the header to reclaim
 * vertical space so the 2x2 grid + marketplace fit without scrolling.
 * Every other page keeps the app name here (that page's own <h1> already
 * lives in its content, same as before).
 */
export function HeaderTitle({ hijri }: { hijri: string | null }) {
  const pathname = usePathname();
  const locale = useLocale();
  const tApp = useTranslations('app');
  const tDashboard = useTranslations('dashboard');

  const isHome = pathname === `/${locale}`;
  const title = isHome ? tDashboard('title') : tApp('name');

  return (
    <div>
      <h1 className="font-logo text-2xl font-medium tracking-wide text-gold">{title}</h1>
      {hijri && <p className="text-xs text-slate-400">{hijri}</p>}
    </div>
  );
}
