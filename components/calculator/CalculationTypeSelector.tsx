'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { User, FileText, Hand, Type, Sparkles, BookOpen, Search, ChevronRight, Check } from 'lucide-react';

export type CalculationType = 'name' | 'phrase' | 'dhikr' | 'general' | 'divineResonance' | 'quranicResonance';

/** Types that need both a person's name and a mother's name, vs. the single-field types above. */
export const TWO_NAME_TYPES: CalculationType[] = ['divineResonance', 'quranicResonance'];

type CategoryKey = 'textAnalysis' | 'divine' | 'quran';

const CATEGORIES: { key: CategoryKey; Icon: typeof User; labelKey: string }[] = [
  { key: 'textAnalysis', Icon: FileText, labelKey: 'categoryTextAnalysis' },
  { key: 'divine', Icon: Sparkles, labelKey: 'categoryDivine' },
  { key: 'quran', Icon: BookOpen, labelKey: 'categoryQuran' },
];

export const CALCULATION_TYPES: {
  type: CalculationType;
  Icon: typeof User;
  titleKey: string;
  subtitleKey: string;
  category: CategoryKey;
}[] = [
  { type: 'name', Icon: User, titleKey: 'typeName', subtitleKey: 'typeNameSubtitle', category: 'textAnalysis' },
  { type: 'phrase', Icon: FileText, titleKey: 'typePhrase', subtitleKey: 'typePhraseSubtitle', category: 'textAnalysis' },
  { type: 'general', Icon: Type, titleKey: 'typeGeneral', subtitleKey: 'typeGeneralSubtitle', category: 'textAnalysis' },
  { type: 'dhikr', Icon: Hand, titleKey: 'typeDhikr', subtitleKey: 'typeDhikrSubtitle', category: 'divine' },
  {
    type: 'divineResonance',
    Icon: Sparkles,
    titleKey: 'typeDivineResonance',
    subtitleKey: 'typeDivineResonanceSubtitle',
    category: 'divine',
  },
  {
    type: 'quranicResonance',
    Icon: BookOpen,
    titleKey: 'typeQuranicResonance',
    subtitleKey: 'typeQuranicResonanceSubtitle',
    category: 'quran',
  },
];

export function CalculationTypeSelector({
  value,
  onChange,
}: {
  value: CalculationType;
  onChange: (type: CalculationType) => void;
}) {
  const t = useTranslations('calculator');
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
                {cat.items.map(({ type, Icon, titleKey, subtitleKey }, i) => {
                  const isActive = type === value;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => onChange(type)}
                      className={`flex items-center gap-3 px-3 py-3 text-left ${
                        i > 0 ? 'border-t border-white/5' : ''
                      } ${isActive ? 'bg-gold/10' : ''}`}
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                          isActive ? 'bg-gold/20 text-gold' : 'bg-white/5 text-slate-400'
                        }`}
                      >
                        <Icon size={16} aria-hidden />
                      </span>
                      <span className="flex-1">
                        <span className={`block text-sm font-medium ${isActive ? 'text-gold' : 'text-slate-100'}`}>
                          {t(titleKey)}
                        </span>
                        <span className="block text-xs text-slate-500">{t(subtitleKey)}</span>
                      </span>
                      {isActive ? (
                        <Check size={16} className="shrink-0 text-gold" aria-hidden />
                      ) : (
                        <ChevronRight size={16} className="shrink-0 text-slate-600 rtl:rotate-180" aria-hidden />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
