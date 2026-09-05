'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { RotateCcw } from 'lucide-react';
import { calculateDestiny } from '@/lib/abjad/coreCalculations';
import { zodiacFromBurjIndex } from '@/lib/abjad/zodiac';
import { fetchBurujProfile, type BurujProfile, type Locale } from '@/lib/abjad/buruj';
import { AttributionFooter } from '@/components/AttributionFooter';
import { NameField } from '@/components/forms/NameField';
import { ResultHero } from './ResultHero';
import { ResultTabs } from './ResultTabs';

export function IstikharaForm() {
  const t = useTranslations('istikhara');
  const locale = useLocale() as Locale;
  const [name, setName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calculateDestiny> | null>(null);
  const [profile, setProfile] = useState<BurujProfile | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    const destiny = calculateDestiny(name, motherName);
    setResult(destiny);
    setProfile(null);
    setLoading(true);
    try {
      const p = await fetchBurujProfile(destiny.burjIndex);
      setProfile(p);
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setResult(null);
    setProfile(null);
    setName('');
    setMotherName('');
  }

  const zodiac = result ? zodiacFromBurjIndex(result.burjIndex) : null;

  if (result && zodiac) {
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

        <ResultHero result={result} zodiac={zodiac} profile={profile} locale={locale} />
        <AttributionFooter name="Cherno Moussa Yero Sy" />

        {loading && <p className="px-1 text-sm text-slate-400">{t('loading')}</p>}
        {profile && <ResultTabs profile={profile} locale={locale} />}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <NameField label={t('nameLabel')} value={name} onChange={setName} placeholder={t('namePlaceholder')} />
        <NameField
          label={t('motherNameLabel')}
          value={motherName}
          onChange={setMotherName}
          placeholder={t('motherNamePlaceholder')}
        />
        <button
          type="submit"
          disabled={!name.trim()}
          className="rounded-xl bg-gold px-4 py-2 text-sm font-medium text-navy disabled:opacity-40"
        >
          {t('submit')}
        </button>
      </form>
    </div>
  );
}
