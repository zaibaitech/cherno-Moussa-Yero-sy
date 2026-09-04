'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { calculateNameCompatibility, type RelationshipCompatibility } from '@/lib/abjad/compatibility';
import { Card } from '@/components/ui/Card';
import { ScoreBar } from './ScoreBar';

type Locale = 'en' | 'fr' | 'ar';

function pick(locale: Locale, en: string, fr: string, ar: string): string {
  if (locale === 'fr') return fr;
  if (locale === 'ar') return ar;
  return en;
}

export function CompatibilityForm() {
  const t = useTranslations('compatibility');
  const locale = useLocale() as Locale;
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState<RelationshipCompatibility | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name1.trim() || !name2.trim()) return;
    setResult(calculateNameCompatibility(name1, name1, name2, name2));
  }

  const overallQualityLabel = result
    ? pick(locale, result.overallQuality, result.overallQualityFrench, result.overallQualityArabic)
    : '';

  const methodRows = result
    ? [
        { label: t('spiritualDestiny'), r: result.methods.spiritualDestiny },
        { label: t('elementalTemperament'), r: result.methods.elementalTemperament },
        { label: t('planetaryCosmic'), r: result.methods.planetaryCosmic },
        { label: t('dailyInteraction'), r: result.methods.dailyInteraction },
      ]
    : [];

  const recommendations = result
    ? locale === 'fr'
      ? result.recommendationsFrench
      : locale === 'ar'
        ? result.recommendationsArabic
        : result.recommendations
    : [];

  const summary = result ? pick(locale, result.summary, result.summaryFrench, result.summaryArabic) : '';

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          {t('person1Label')}
          <input
            dir="rtl"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
            placeholder={t('namePlaceholder')}
            className="rounded-xl border border-white/10 bg-navy-card px-3 py-2 text-right text-slate-100 outline-none focus:border-gold"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-slate-300">
          {t('person2Label')}
          <input
            dir="rtl"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
            placeholder={t('namePlaceholder')}
            className="rounded-xl border border-white/10 bg-navy-card px-3 py-2 text-right text-slate-100 outline-none focus:border-gold"
          />
        </label>
        <button
          type="submit"
          disabled={!name1.trim() || !name2.trim()}
          className="rounded-xl bg-gold px-4 py-2 text-sm font-medium text-navy disabled:opacity-40"
        >
          {t('submit')}
        </button>
      </form>

      {result && (
        <div className="flex flex-col gap-3">
          <Card className="text-center">
            <p className="text-xs uppercase tracking-wide text-slate-400">{t('overallScore')}</p>
            <p className="mt-1 text-4xl font-semibold text-gold">{result.overallScore}%</p>
            <p className="mt-1 text-sm text-slate-300">{overallQualityLabel}</p>
            <p className="mt-3 text-sm text-slate-300">{summary}</p>
          </Card>

          <Card className="flex flex-col gap-4">
            {methodRows.map(({ label, r }) => (
              <div key={label} className="flex flex-col gap-1">
                <ScoreBar label={label} score={r.score} />
                <p className="text-xs text-slate-400">
                  {pick(locale, r.description, r.descriptionFrench, r.descriptionArabic)}
                </p>
              </div>
            ))}
          </Card>

          {recommendations.length > 0 && (
            <Card>
              <h3 className="mb-2 text-sm font-medium text-slate-200">{t('recommendations')}</h3>
              <ul className="flex flex-col gap-2 text-sm text-slate-300">
                {recommendations.map((rec, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-gold">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          <p className="px-1 text-xs text-slate-500">{t('disclaimer')}</p>
        </div>
      )}
    </div>
  );
}
