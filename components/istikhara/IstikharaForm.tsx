'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { calculateDestiny } from '@/lib/abjad/coreCalculations';
import { zodiacFromBurjIndex } from '@/lib/abjad/zodiac';
import { fetchBurujProfile, type BurujProfile, type Locale } from '@/lib/abjad/buruj';
import { Card } from '@/components/ui/Card';
import { AttributionFooter } from '@/components/AttributionFooter';
import { BurujProfileSections } from './BurujProfileSections';

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

  const zodiac = result ? zodiacFromBurjIndex(result.burjIndex) : null;

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

      {result && zodiac && (
        <div className="flex flex-col gap-3">
          <Card>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{zodiac.symbol}</span>
              <h2 className="text-lg font-semibold text-gold">{zodiac[locale]}</h2>
              {profile && <span className="text-2xl">{profile.element_emoji}</span>}
            </div>
            <AttributionFooter name="Cherno Moussa Yero Sy" />
          </Card>

          {loading && <p className="px-1 text-sm text-slate-400">{t('loading')}</p>}
          {profile && <BurujProfileSections profile={profile} locale={locale} />}
        </div>
      )}
    </div>
  );
}
