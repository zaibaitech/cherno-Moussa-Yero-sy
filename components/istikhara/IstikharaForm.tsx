'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { calculateDestiny } from '@/lib/abjad/coreCalculations';
import { zodiacFromBurjIndex } from '@/lib/abjad/zodiac';
import { ISTIKHARA_READINGS } from '@/content/istikhara-readings';
import { Card } from '@/components/ui/Card';
import { AttributionFooter } from '@/components/AttributionFooter';

type Locale = 'en' | 'fr' | 'ar';

export function IstikharaForm() {
  const t = useTranslations('istikhara');
  const locale = useLocale() as Locale;
  const [name, setName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calculateDestiny> | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setResult(calculateDestiny(name, motherName));
  }

  const zodiac = result ? zodiacFromBurjIndex(result.burjIndex) : null;
  const reading = zodiac ? ISTIKHARA_READINGS[zodiac.key] : null;

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          {t('nameLabel')}
          <input
            dir="rtl"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('namePlaceholder')}
            className="rounded-xl border border-white/10 bg-navy-card px-3 py-2 text-right text-slate-100 outline-none focus:border-gold"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          {t('motherNameLabel')}
          <input
            dir="rtl"
            value={motherName}
            onChange={(e) => setMotherName(e.target.value)}
            placeholder={t('motherNamePlaceholder')}
            className="rounded-xl border border-white/10 bg-navy-card px-3 py-2 text-right text-slate-100 outline-none focus:border-gold"
          />
        </label>
        <button
          type="submit"
          disabled={!name.trim()}
          className="rounded-xl bg-gold px-4 py-2 text-sm font-medium text-navy disabled:opacity-40"
        >
          {t('submit')}
        </button>
      </form>

      {result && zodiac && reading && (
        <Card>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{zodiac.symbol}</span>
            <h2 className="text-lg font-semibold text-gold">{zodiac[locale]}</h2>
          </div>
          <p className="mt-2 text-sm text-slate-300">{reading.summary[locale]}</p>
          <p className="mt-2 text-xs text-amber-400">{t('placeholderNotice')}</p>
          <AttributionFooter name={reading.authorizedBy} />
        </Card>
      )}
    </div>
  );
}
