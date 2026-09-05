'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { RotateCcw, List } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { NameField } from '@/components/forms/NameField';
import { analyzeText, type TextProfile } from '@/lib/abjad/textAnalysis';
import type { DivineName } from '@/lib/abjad/divineNames';
import { CalculationTypeSelector, CALCULATION_TYPES, type CalculationType } from './CalculationTypeSelector';
import { DivineNamePicker } from './DivineNamePicker';
import { CalculatorResult } from './CalculatorResult';

const FIELD_KEYS: Record<'name' | 'phrase' | 'general', { label: string; placeholder: string }> = {
  name: { label: 'nameFieldLabel', placeholder: 'nameFieldPlaceholder' },
  phrase: { label: 'phraseFieldLabel', placeholder: 'phraseFieldPlaceholder' },
  general: { label: 'generalFieldLabel', placeholder: 'generalFieldPlaceholder' },
};

export function CalculatorForm() {
  const t = useTranslations('calculator');
  const [calcType, setCalcType] = useState<CalculationType>('name');
  const [text, setText] = useState('');
  const [selectedDivineName, setSelectedDivineName] = useState<DivineName | null>(null);
  const [showDivinePicker, setShowDivinePicker] = useState(false);
  const [profile, setProfile] = useState<TextProfile | null>(null);
  const [empty, setEmpty] = useState(false);

  const sourceText = calcType === 'dhikr' ? (selectedDivineName?.arabic ?? '') : text;
  const activeType = CALCULATION_TYPES.find((c) => c.type === calcType)!;
  const ActiveIcon = activeType.Icon;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = analyzeText(sourceText);
    setProfile(result);
    setEmpty(!result);
  }

  function handleTypeChange(type: CalculationType) {
    setCalcType(type);
    setText('');
    setSelectedDivineName(null);
    setEmpty(false);
  }

  function handleReset() {
    setProfile(null);
    setEmpty(false);
    setText('');
    setSelectedDivineName(null);
  }

  if (profile) {
    return (
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1.5 self-start text-xs font-medium text-slate-400"
        >
          <RotateCcw size={13} aria-hidden />
          {t('newCalculation')}
        </button>
        <CalculatorResult profile={profile} calcType={calcType} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <CalculationTypeSelector value={calcType} onChange={handleTypeChange} />

      <Card className="flex flex-col gap-3">
        <div className="flex items-center gap-2 border-b border-white/5 pb-2">
          <ActiveIcon size={16} className="text-gold" aria-hidden />
          <h2 className="text-sm font-semibold text-gold">{t(activeType.titleKey)}</h2>
        </div>

        {calcType === 'dhikr' ? (
          <div className="flex flex-col gap-1.5">
            <button
              type="button"
              onClick={() => setShowDivinePicker(true)}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-navy px-3 py-2 text-sm text-slate-300"
            >
              <span className="flex items-center gap-1.5">
                <List size={14} aria-hidden />
                {t('selectDivineName')}
              </span>
              {selectedDivineName && (
                <span dir="rtl" className="text-base text-gold">
                  {selectedDivineName.arabic}
                </span>
              )}
            </button>
            {showDivinePicker && (
              <DivineNamePicker
                onSelect={(name) => {
                  setSelectedDivineName(name);
                  setShowDivinePicker(false);
                }}
                onClose={() => setShowDivinePicker(false)}
              />
            )}
          </div>
        ) : (
          <NameField
            label={t(FIELD_KEYS[calcType].label)}
            value={text}
            onChange={setText}
            placeholder={t(FIELD_KEYS[calcType].placeholder)}
            showPicker={false}
          />
        )}
      </Card>

      {empty && <p className="text-xs text-red-400">{t('noLetters')}</p>}
      <button
        type="submit"
        disabled={!sourceText.trim()}
        className="rounded-xl bg-gold px-4 py-2 text-sm font-medium text-navy disabled:opacity-40"
      >
        {t('calculate')}
      </button>
    </form>
  );
}
