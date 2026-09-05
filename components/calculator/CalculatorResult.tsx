'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Star, Link2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { pick, ELEMENT_NAME, type Locale } from '@/lib/abjad/buruj';
import { getLetterBreakdown, calculateSaghir } from '@/lib/abjad/coreCalculations';
import { findLatinForArabic } from '@/lib/nameTransliterations';
import { DIVINE_NAME_MEANING } from '@/lib/abjad/divineNameMeanings';
import {
  ELEMENT_EMOJI,
  computeNameInsights,
  computePhraseInsights,
  computeDhikrCounts,
  type TextProfile,
  type ElementType,
} from '@/lib/abjad/textAnalysis';
import { DHIKR_TIMING, DHIKR_PREPARATION, DHIKR_ETIQUETTE } from '@/lib/abjad/calculatorContent';
import { InfoDisclosure, InfoIconButton } from './InfoDisclosure';
import type { CalculationType } from './CalculationTypeSelector';

const ELEMENT_BAR_COLOR: Record<ElementType, string> = {
  fire: '#f97316',
  water: '#38bdf8',
  air: '#67e8f9',
  earth: '#34d399',
};

const ANALYSIS_TITLE_KEY: Record<CalculationType, string> = {
  name: 'analysisTitleName',
  phrase: 'analysisTitlePhrase',
  dhikr: 'analysisTitleDhikr',
  general: 'analysisTitleGeneral',
};

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-xs text-gold">{children}</span>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-semibold text-gold">{children}</p>;
}

export function CalculatorResult({ profile, calcType }: { profile: TextProfile; calcType: CalculationType }) {
  const t = useTranslations('calculator');
  const locale = useLocale() as Locale;
  const [openMetric, setOpenMetric] = useState<string | null>(null);

  const letterBreakdown = getLetterBreakdown(profile.normalizedText);
  const latin = findLatinForArabic(profile.normalizedText);

  const numbers: { key: string; label: string; value: number; kind: 'classical' | 'traditional'; formula: string }[] = [
    { key: 'kabir', label: t('kabir'), value: profile.kabir, kind: 'classical', formula: t('kabirFormula') },
    { key: 'saghir', label: t('saghir'), value: profile.saghir, kind: 'classical', formula: t('saghirFormula') },
    { key: 'wusta', label: t('wusta'), value: profile.wusta, kind: 'traditional', formula: t('wustaFormula') },
    { key: 'sirr', label: t('sirr'), value: profile.sirr, kind: 'traditional', formula: t('sirrFormula') },
    { key: 'kamal', label: t('kamal'), value: profile.kamal, kind: 'traditional', formula: t('kamalFormula') },
    { key: 'bast', label: t('bast'), value: profile.bast, kind: 'traditional', formula: t('bastFormula') },
  ];
  const openMetricData = numbers.find((n) => n.key === openMetric) ?? null;

  const elements: ElementType[] = ['fire', 'water', 'air', 'earth'];

  const nameInsights = calcType === 'name' ? computeNameInsights(profile) : null;
  const phraseInsights = calcType === 'phrase' ? computePhraseInsights(profile) : null;
  const dhikrCounts = calcType === 'dhikr' ? computeDhikrCounts(profile) : null;

  const tellsItems = t.raw('analysisTellsItems') as string[];
  const notItems = t.raw('analysisNotItems') as string[];

  const divineThemes =
    nameInsights?.divineNameMatches.map((m) => (DIVINE_NAME_MEANING[m.number] ? pick(locale, DIVINE_NAME_MEANING[m.number]) : m.transliteration)) ?? [];

  return (
    <div className="flex flex-col gap-3">
      {/* 1. Name header — the calculated text, not a personality verdict */}
      <div className="flex flex-col items-center gap-1.5 rounded-2xl border border-gold/20 bg-navy-card px-4 py-6 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-slate-500">{t(ANALYSIS_TITLE_KEY[calcType])}</p>
        <p dir="rtl" lang="ar" className="text-4xl font-medium text-gold">
          {profile.normalizedText}
        </p>
        {latin && <p className="text-sm text-slate-300">{latin}</p>}
        <p className="mt-1 text-xs text-slate-500">{t('methodologyLabel')}</p>
      </div>

      {/* 2. Numerical signature — the primary, unambiguous result */}
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-gold/30 bg-navy-card px-4 py-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">{t('numericalSignature')}</p>
        <p className="text-xs text-slate-500">{t('abjadKabirLabel')}</p>
        <p className="text-5xl font-bold text-gold">{profile.kabir}</p>
        {letterBreakdown.length > 0 && (
          <p dir="ltr" className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-sm text-slate-400">
            {letterBreakdown.map((lv, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-slate-600">+</span>}
                <span dir="rtl" className="text-slate-200">
                  {lv.char}
                </span>
                <span>= {lv.value}</span>
              </span>
            ))}
          </p>
        )}
        <div className="mt-1">
          <InfoDisclosure label={t('howCalculated')} icon="chevron">
            {t('howCalculatedBody')}
          </InfoDisclosure>
        </div>
      </div>

      {/* 3. Letter composition */}
      {profile.letterFrequency.length > 0 && (
        <Card className="flex flex-col gap-3">
          <SectionTitle>{t('letterFrequency')}</SectionTitle>
          <p dir="ltr" className="flex flex-wrap justify-center gap-2 text-2xl text-slate-100">
            {letterBreakdown.map((lv, i) => (
              <span key={i} dir="rtl">
                {lv.char}
              </span>
            ))}
          </p>
          <div className="flex flex-col gap-2">
            {profile.letterFrequency.map((f) => {
              const max = profile.letterFrequency[0]?.count || 1;
              return (
                <div key={f.letter} className="flex items-center gap-2">
                  <span dir="rtl" className="w-5 shrink-0 text-center text-base text-slate-100">
                    {f.letter}
                  </span>
                  <span className="w-8 shrink-0 text-right text-xs text-slate-500">{f.value}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gold"
                      style={{ width: `${(f.count / max) * 100}%` }}
                    />
                  </div>
                  <span className="w-8 shrink-0 text-xs text-slate-400">×{f.count}</span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between border-t border-white/5 pt-2 text-xs text-slate-500">
            <span>
              {t('totalLettersLabel')}: <span className="text-slate-300">{profile.letterFrequency.reduce((s, f) => s + f.count, 0)}</span>
            </span>
            <span>
              {t('uniqueLettersLabel')}: <span className="text-slate-300">{profile.letterFrequency.length}</span>
            </span>
          </div>
        </Card>
      )}

      {/* 4. Numerical profile — each value traceable to its own formula */}
      <Card className="flex flex-col gap-3">
        <SectionTitle>{t('numericalProfileTitle')}</SectionTitle>
        <div className="grid grid-cols-3 gap-2">
          {numbers.map((n) => (
            <button
              key={n.key}
              type="button"
              onClick={() => setOpenMetric((cur) => (cur === n.key ? null : n.key))}
              className={`relative rounded-xl border px-2 py-2 text-center ${
                openMetric === n.key ? 'border-gold/50 bg-gold/10' : 'border-white/5 bg-navy'
              }`}
            >
              <span className="absolute right-1.5 top-1.5 text-slate-500">
                <InfoIconButton onClick={() => setOpenMetric((cur) => (cur === n.key ? null : n.key))} active={openMetric === n.key} />
              </span>
              <p className="text-lg font-semibold text-gold">{n.value}</p>
              <p className="text-[10px] uppercase tracking-wide text-slate-500">{n.label}</p>
            </button>
          ))}
        </div>
        {openMetricData && (
          <div className="rounded-lg bg-navy/60 p-2.5 text-xs leading-relaxed text-slate-400">
            <p className="mb-1 font-medium text-slate-300">
              {openMetricData.kind === 'classical' ? t('classicalCalculation') : t('traditionalUnverified')}
            </p>
            <p>{openMetricData.formula}</p>
          </div>
        )}
      </Card>

      {/* 5. Elemental correspondence */}
      <Card className="flex flex-col gap-3">
        <div>
          <SectionTitle>{t('elementalComposition')}</SectionTitle>
          <p className="text-xs text-slate-500">{t('elementalCorrespondenceSubtitle')}</p>
        </div>
        <div className="flex flex-col gap-2">
          {elements.map((el) => (
            <div key={el} className="flex items-center gap-2">
              <span className="w-16 shrink-0 text-xs text-slate-400">
                {ELEMENT_EMOJI[el]} {pick(locale, ELEMENT_NAME[el])}
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${profile.elemental.percents[el]}%`, backgroundColor: ELEMENT_BAR_COLOR[el] }}
                />
              </div>
              <span className="w-9 shrink-0 text-right text-xs text-slate-400">{profile.elemental.percents[el]}%</span>
            </div>
          ))}
        </div>
        {profile.elemental.dominantElements.length > 0 && (
          <p className="text-xs text-slate-500">
            {t('dominantElement')}: {profile.elemental.dominantElements.map((e) => pick(locale, ELEMENT_NAME[e])).join(' + ')}
            {profile.elemental.weakestElements.length > 0 &&
              ` · ${t('weakestElement')}: ${profile.elemental.weakestElements.map((e) => pick(locale, ELEMENT_NAME[e])).join(' + ')}`}
          </p>
        )}
        <InfoDisclosure label={`${t('balanceScore')}: ${profile.elemental.balanceScore}% (${t('derivedMetricLabel')})`}>
          {t('balanceIndexFormula')}
        </InfoDisclosure>
      </Card>

      {/* 6. Letter-by-letter correspondence — only fields this app's dataset actually supports */}
      {letterBreakdown.length > 0 && (
        <Card className="flex flex-col gap-3">
          <SectionTitle>{t('letterCorrespondencesTitle')}</SectionTitle>
          <div className="flex flex-col divide-y divide-white/5">
            {profile.letterFrequency.map((f) => (
              <div key={f.letter} className="flex items-center justify-between py-2 first:pt-0 last:pb-0">
                <span dir="rtl" className="text-xl text-gold">
                  {f.letter}
                </span>
                <div className="text-right text-xs text-slate-400">
                  <p>
                    {t('abjadValueLabel')}: <span className="text-slate-200">{f.value}</span> · {t('frequencyLabel')}: {f.count}×
                  </p>
                  <p>
                    {t('elementLabel')}: {ELEMENT_EMOJI[f.element]} {pick(locale, ELEMENT_NAME[f.element])}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500">
            {t('correspondenceSystemLabel')}: {t('correspondenceSystemName')}
          </p>
          <p className="text-xs leading-relaxed text-slate-500">{t('correspondenceNote')}</p>
        </Card>
      )}

      {/* 7. Zodiacal correspondence — explicitly not a natal zodiac sign */}
      <Card className="flex flex-col items-center gap-2 text-center">
        <SectionTitle>{t('zodiacalCorrespondenceTitle')}</SectionTitle>
        {profile.zodiac ? (
          <>
            <span className="text-3xl text-gold">{profile.zodiac.symbol}</span>
            <p className="text-lg font-semibold text-gold">{profile.zodiac[locale]}</p>
            <p className="text-xs text-slate-500">{t('letterBasedCorrespondence')}</p>
            <InfoDisclosure label={t('howCalculated')}>{t('zodiacDisclaimer')}</InfoDisclosure>
          </>
        ) : (
          <p className="text-sm text-slate-500">{t('zodiacUnavailable')}</p>
        )}
      </Card>

      {nameInsights && (
        <>
          {/* 8. Symbolic archetype */}
          <Card className="flex flex-col gap-2">
            <SectionTitle>{t('archetype')}</SectionTitle>
            <p className="text-lg font-semibold text-gold">{pick(locale, nameInsights.archetype.title)}</p>
            <p className="text-sm text-slate-300">{pick(locale, nameInsights.archetype.description)}</p>
            <div>
              <p className="mb-1 text-xs font-medium text-slate-500">{t('themesLabel')}</p>
              <div className="flex flex-wrap gap-1.5">
                {nameInsights.archetype.qualities[locale].map((q) => (
                  <Pill key={q}>{q}</Pill>
                ))}
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-500">{t('archetypeDisclaimer')}</p>
            <div className="border-t border-white/5 pt-2">
              <p className="text-xs font-medium text-slate-500">{t('spiritualGuidance')}</p>
              <p className="text-sm text-slate-300">{pick(locale, nameInsights.guidance)}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="font-medium text-slate-500">{t('bestTimeWindow')}</p>
                <p className="text-slate-300">{pick(locale, nameInsights.bestTime)}</p>
              </div>
              <div>
                <p className="font-medium text-slate-500">{t('powerDays')}</p>
                <p className="text-slate-300">{pick(locale, nameInsights.powerDay)}</p>
              </div>
            </div>
          </Card>

          {/* 9. Divine-name correspondences */}
          {nameInsights.divineNameMatches.length > 0 && (
            <Card className="flex flex-col gap-3">
              <div>
                <SectionTitle>{t('divineNameResonance')}</SectionTitle>
                <p className="text-xs text-slate-500">{t('divineNameSubtitle')}</p>
              </div>
              <div className="flex flex-col gap-2">
                {nameInsights.divineNameMatches.map((m, i) => {
                  const isClosest = i === 0;
                  const matchLabel = m.distance === 0 ? t('exactMatchLabel') : isClosest ? t('closestMatchLabel') : t('numericalCorrespondenceLabel');
                  const diff = m.abjadValue - profile.kabir;
                  const diffStr = diff > 0 ? `+${diff}` : `${diff}`;
                  const divineSaghir = calculateSaghir(m.abjadValue);
                  const meaning = DIVINE_NAME_MEANING[m.number] ? pick(locale, DIVINE_NAME_MEANING[m.number]) : null;
                  return (
                    <div
                      key={m.number}
                      className={`rounded-xl border px-3 py-2.5 ${isClosest ? 'border-gold/40 bg-gold/5' : 'border-white/10 bg-navy/60'}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p dir="rtl" className="text-xl text-gold">
                            {m.arabic}
                          </p>
                          <p className="text-sm font-medium text-slate-200">{m.transliteration}</p>
                          {meaning && <p className="text-xs text-slate-500">{meaning}</p>}
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-1">
                          <span className="text-sm font-semibold text-gold">{m.abjadValue}</span>
                          <span
                            className={`flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] ${
                              isClosest ? 'border-gold/40 text-gold' : 'border-white/10 text-slate-400'
                            }`}
                          >
                            {isClosest ? <Star size={10} aria-hidden /> : <Link2 size={10} aria-hidden />}
                            {matchLabel}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 border-t border-white/5 pt-1.5 text-[11px] text-slate-500">
                        <span>
                          {t('kabir')}: {profile.kabir} ↔ {m.abjadValue} ({diffStr})
                        </span>
                        <span>
                          {t('reducedValueLabel')}: {profile.saghir} ↔ {divineSaghir}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <InfoDisclosure label={t('whyThese')}>
                <p>{t('whyTheseIntro')}</p>
                <p className="mt-1.5">
                  <span className="text-slate-300">{t('whyTheseRuleLabel')}:</span> {t('whyTheseRuleValue')}
                </p>
                <p className="mt-1.5">{t('whyTheseMultipleSystems')}</p>
              </InfoDisclosure>
              <p className="text-xs leading-relaxed text-slate-500">{t('divineNameEsotericNote')}</p>
            </Card>
          )}

          {/* Symbolic attribute themes drawn from the matched Divine Names */}
          {divineThemes.length > 0 && (
            <Card className="flex flex-col gap-2">
              <div>
                <SectionTitle>{t('attributeThemesTitle')}</SectionTitle>
                <p className="text-xs text-slate-500">{t('attributeThemesSubtitle')}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-medium text-slate-500">{t('primaryThemeLabel')}</p>
                <Pill>{divineThemes[0]}</Pill>
              </div>
              {divineThemes.length > 1 && (
                <div>
                  <p className="mb-1 text-xs font-medium text-slate-500">{t('secondaryThemesLabel')}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {divineThemes.slice(1).map((theme) => (
                      <Pill key={theme}>{theme}</Pill>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* Spiritual reflection — contemplative, not deterministic */}
          {divineThemes.length > 0 && (
            <Card className="flex flex-col gap-2">
              <SectionTitle>{t('spiritualReflectionTitle')}</SectionTitle>
              <p className="text-sm leading-relaxed text-slate-300">
                {t('spiritualReflectionBody', {
                  themes: new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' }).format(divineThemes),
                })}
              </p>
            </Card>
          )}

          {/* 10. Suggested dhikr / numerical reflection */}
          <Card className="flex flex-col gap-2">
            <SectionTitle>{t('recommendedDhikrCounts')}</SectionTitle>
            <div className="flex flex-wrap gap-1.5">
              {nameInsights.dhikrCounts.map((c, i) => (
                <Pill key={`${c}-${i}`}>{c}</Pill>
              ))}
            </div>
            <p className="text-xs leading-relaxed text-slate-500">{t('dhikrDisclaimer')}</p>
            <InfoDisclosure label={t('dhikrWhyThese')}>{t('dhikrWhyTheseBody')}</InfoDisclosure>
          </Card>
        </>
      )}

      {phraseInsights && (
        <Card className="flex flex-col gap-3">
          {phraseInsights.repeatedLetters.length > 0 && (
            <div>
              <SectionTitle>{t('repeatedLetters')}</SectionTitle>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {phraseInsights.repeatedLetters.map((f) => (
                  <span
                    key={f.letter}
                    className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-navy px-2 py-1 text-xs"
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ELEMENT_BAR_COLOR[f.element] }} />
                    <span dir="rtl" className="text-sm text-slate-100">
                      {f.letter}
                    </span>
                    <span className="text-slate-500">×{f.count}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
          {phraseInsights.sacredMatch && (
            <div>
              <p className="text-xs font-medium text-slate-400">
                {t('nearSacredNumber')}: {phraseInsights.sacredMatch.nearest}
              </p>
              <p className="text-sm text-slate-300">{pick(locale, phraseInsights.sacredMatch.significance)}</p>
            </div>
          )}
        </Card>
      )}

      {dhikrCounts && (
        <Card className="flex flex-col gap-3">
          <SectionTitle>{t('suggestedCounts')}</SectionTitle>
          <div className="flex flex-wrap gap-1.5">
            {dhikrCounts.valueBased && (
              <Pill>
                {t('valueBased')}: {dhikrCounts.valueBased}
              </Pill>
            )}
            {dhikrCounts.traditional.map((c) => (
              <Pill key={c}>{c}</Pill>
            ))}
          </div>
          <p className="text-xs leading-relaxed text-slate-500">{t('dhikrDisclaimer')}</p>
          <InfoDisclosure label={t('dhikrWhyThese')}>{t('dhikrWhyTheseBody')}</InfoDisclosure>
          <div>
            <p className="mb-1 text-xs font-medium text-slate-400">{t('bestTimesToPractice')}</p>
            <p className="text-sm text-slate-300">{DHIKR_TIMING.map((t2) => pick(locale, t2)).join(' · ')}</p>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium text-slate-400">{t('practiceGuidance')}</p>
            <p className="text-xs text-slate-500">
              {t('preparation')}: {DHIKR_PREPARATION.map((p) => pick(locale, p)).join(', ')}
            </p>
            <p className="text-xs text-slate-500">
              {t('etiquette')}: {DHIKR_ETIQUETTE.map((p) => pick(locale, p)).join(', ')}
            </p>
          </div>
        </Card>
      )}

      {/* 11. What this analysis can / cannot tell you */}
      <Card className="flex flex-col gap-3">
        <div>
          <SectionTitle>{t('analysisTellsTitle')}</SectionTitle>
          <ul className="mt-1.5 flex flex-col gap-1">
            {tellsItems.map((item) => (
              <li key={item} className="flex items-start gap-1.5 text-xs text-slate-300">
                <span className="mt-0.5 text-emerald-400">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-white/5 pt-2">
          <SectionTitle>{t('analysisNotTitle')}</SectionTitle>
          <ul className="mt-1.5 flex flex-col gap-1">
            {notItems.map((item) => (
              <li key={item} className="flex items-start gap-1.5 text-xs text-slate-300">
                <span className="mt-0.5 text-red-400">✕</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Card>

      {/* 12. Methodology & sources */}
      <Card className="flex flex-col gap-2">
        <SectionTitle>{t('methodologyTitle')}</SectionTitle>
        <dl className="flex flex-col gap-1.5 text-xs">
          {[
            [t('methodologyTraditionLabel'), t('methodologyTraditionValue')],
            [t('methodologyPrimarySystemLabel'), t('methodologyPrimarySystemValue')],
            [t('correspondenceSystemLabel'), t('correspondenceSystemName')],
            [t('methodologyInterpretiveLabel'), t('methodologyInterpretiveValue')],
            [t('methodologyBirthDataLabel'), t('methodologyBirthDataValue')],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-2">
              <dt className="text-slate-500">{label}</dt>
              <dd className="text-right text-slate-300">{value}</dd>
            </div>
          ))}
        </dl>
        <InfoDisclosure label={t('learnMore')} icon="chevron">
          {t('learnMoreBody')}
        </InfoDisclosure>
      </Card>
    </div>
  );
}
