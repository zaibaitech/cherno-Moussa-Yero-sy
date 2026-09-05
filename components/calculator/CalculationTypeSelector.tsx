'use client';

import { useTranslations } from 'next-intl';
import { User, FileText, Hand, Type, Sparkles, BookOpen } from 'lucide-react';

export type CalculationType = 'name' | 'phrase' | 'dhikr' | 'general' | 'divineResonance' | 'quranicResonance';

/** Types that need both a person's name and a mother's name, vs. the single-field types above. */
export const TWO_NAME_TYPES: CalculationType[] = ['divineResonance', 'quranicResonance'];

export const CALCULATION_TYPES: { type: CalculationType; Icon: typeof User; titleKey: string; subtitleKey: string }[] = [
  { type: 'name', Icon: User, titleKey: 'typeName', subtitleKey: 'typeNameSubtitle' },
  { type: 'phrase', Icon: FileText, titleKey: 'typePhrase', subtitleKey: 'typePhraseSubtitle' },
  { type: 'dhikr', Icon: Hand, titleKey: 'typeDhikr', subtitleKey: 'typeDhikrSubtitle' },
  { type: 'general', Icon: Type, titleKey: 'typeGeneral', subtitleKey: 'typeGeneralSubtitle' },
  { type: 'divineResonance', Icon: Sparkles, titleKey: 'typeDivineResonance', subtitleKey: 'typeDivineResonanceSubtitle' },
  { type: 'quranicResonance', Icon: BookOpen, titleKey: 'typeQuranicResonance', subtitleKey: 'typeQuranicResonanceSubtitle' },
];

const TYPES = CALCULATION_TYPES;

export function CalculationTypeSelector({
  value,
  onChange,
}: {
  value: CalculationType;
  onChange: (type: CalculationType) => void;
}) {
  const t = useTranslations('calculator');

  return (
    <div>
      <p className="text-sm font-medium text-slate-200">{t('calculationType')}</p>
      <p className="mb-2 text-xs text-slate-500">{t('calculationTypeHelper')}</p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {TYPES.map(({ type, Icon, titleKey, subtitleKey }) => {
          const isActive = type === value;
          return (
            <button
              key={type}
              type="button"
              onClick={() => onChange(type)}
              className={`flex w-24 shrink-0 flex-col items-center gap-1 rounded-xl border px-2 py-3 text-center ${
                isActive ? 'border-gold bg-gold/15' : 'border-white/10 bg-navy-card'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-gold' : 'text-slate-400'} aria-hidden />
              <span className={`text-xs font-medium ${isActive ? 'text-gold' : 'text-slate-200'}`}>{t(titleKey)}</span>
              <span className="text-[10px] leading-tight text-slate-500">{t(subtitleKey)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
