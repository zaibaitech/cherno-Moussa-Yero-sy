'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { X, Search } from 'lucide-react';
import { DIVINE_NAMES, type DivineName } from '@/lib/abjad/divineNames';

export function DivineNamePicker({
  onSelect,
  onClose,
}: {
  onSelect: (name: DivineName) => void;
  onClose: () => void;
}) {
  const t = useTranslations('divineNamePicker');
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DIVINE_NAMES;
    return DIVINE_NAMES.filter((n) => n.transliteration.toLowerCase().includes(q) || n.arabic.includes(query));
  }, [query]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 sm:items-center" onClick={onClose}>
      <div
        className="flex max-h-[75vh] w-full max-w-md flex-col rounded-t-2xl border border-white/10 bg-navy-card sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <h2 className="text-sm font-medium text-slate-100">{t('title')}</h2>
          <button type="button" onClick={onClose} aria-label={t('title')} className="text-slate-400">
            <X size={18} />
          </button>
        </div>

        <div className="border-b border-white/10 px-4 py-2">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-navy px-3 py-2">
            <Search size={16} className="text-slate-500" aria-hidden />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="p-4 text-center text-sm text-slate-500">{t('noResults')}</p>
          ) : (
            results.map((name) => (
              <button
                key={name.number}
                type="button"
                onClick={() => onSelect(name)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left hover:bg-white/5"
              >
                <span className="text-sm text-slate-300">
                  {name.transliteration} <span className="text-slate-500">· {name.abjadValue}</span>
                </span>
                <span dir="rtl" className="text-base text-gold">
                  {name.arabic}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
