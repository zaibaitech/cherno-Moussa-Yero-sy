'use client';

import { useMemo, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Search, ChevronRight } from 'lucide-react';
import { CALCULATION_TYPES, CATEGORIES } from './calculatorTypes';

/**
 * Browse-only list of calculator types — selecting one navigates to its own
 * page (app/[locale]/calculator/[type]) instead of swapping a form in place,
 * so the type picker and the input form are never visible at once.
 */
export function CalculatorTypeBrowser() {
  const t = useTranslations('calculator');
  const locale = useLocale();
  const [query, setQuery] = useState('');

  // Strip apostrophes so "quran" matches "Qur'anic" — a real query users type.
  const normalize = (s: string) => s.toLowerCase().replace(/['’ʿʾ]/g, '');

  const grouped = useMemo(() => {
    const q = normalize(query.trim());
    return CATEGORIES.map((cat) => ({
      ...cat,
      items: CALCULATION_TYPES.filter(
        (item) =>
          item.category === cat.key &&
          (!q || normalize(t(item.titleKey)).includes(q) || normalize(t(item.subtitleKey)).includes(q))
      ),
    })).filter((cat) => cat.items.length > 0);
  }, [query, t]);

  const totalCount = grouped.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-sm font-medium text-slate-200">{t('calculationType')}</p>
        <p className="text-xs text-slate-500">{t('calculationTypeHelper')}</p>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-navy-card px-3 py-2">
        <Search size={15} className="text-slate-500" aria-hidden />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('calculatorSearchPlaceholder')}
          className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
        />
      </div>

      <p className="text-xs text-slate-500">{t('calculatorCountLabel', { count: totalCount })}</p>

      {grouped.length === 0 ? (
        <p className="rounded-xl border border-white/5 bg-navy-card px-3 py-4 text-center text-sm text-slate-500">
          {t('noCalculatorsFound')}
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {grouped.map((cat) => (
            <div key={cat.key} className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gold/80">
                <cat.Icon size={13} aria-hidden />
                {t(cat.labelKey)}
              </div>
              <div className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-navy-card">
                {cat.items.map(({ type, Icon, titleKey, subtitleKey }, i) => (
                  <Link
                    key={type}
                    href={`/${locale}/calculator/${type}`}
                    className={`flex items-center gap-3 px-3 py-3 text-left active:bg-gold/5 ${
                      i > 0 ? 'border-t border-white/5' : ''
                    }`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-slate-400">
                      <Icon size={16} aria-hidden />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-medium text-slate-100">{t(titleKey)}</span>
                      <span className="block text-xs text-slate-500">{t(subtitleKey)}</span>
                    </span>
                    <ChevronRight size={16} className="shrink-0 text-slate-600 rtl:rotate-180" aria-hidden />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
