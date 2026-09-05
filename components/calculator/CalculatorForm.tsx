'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { RotateCcw } from 'lucide-react';
import { NameField } from '@/components/forms/NameField';
import { analyzeText, type TextProfile } from '@/lib/abjad/textAnalysis';
import { CalculatorResult } from './CalculatorResult';

export function CalculatorForm() {
  const t = useTranslations('calculator');
  const [text, setText] = useState('');
  const [profile, setProfile] = useState<TextProfile | null>(null);
  const [empty, setEmpty] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = analyzeText(text);
    setProfile(result);
    setEmpty(!result);
  }

  function handleReset() {
    setProfile(null);
    setEmpty(false);
    setText('');
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
        <CalculatorResult profile={profile} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <NameField
        label={t('inputLabel')}
        value={text}
        onChange={setText}
        placeholder={t('inputPlaceholder')}
        showPicker={false}
      />
      {empty && <p className="text-xs text-red-400">{t('noLetters')}</p>}
      <button
        type="submit"
        disabled={!text.trim()}
        className="rounded-xl bg-gold px-4 py-2 text-sm font-medium text-navy disabled:opacity-40"
      >
        {t('calculate')}
      </button>
    </form>
  );
}
