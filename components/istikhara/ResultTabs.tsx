'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import {
  pick,
  pickList,
  PERSONALITY_FIELDS,
  PERSONALITY_LABELS,
  SECTION_LABELS,
  CAREER_LABELS,
  SADAQAH_LABELS,
  SPIRITUAL_LABELS,
  ANGEL_JINN_LABELS,
  type BurujProfile,
  type Locale,
} from '@/lib/abjad/buruj';

type TabKey = 'overview' | 'personality' | 'career' | 'blessedDay' | 'spiritualPractice' | 'sadaqah';

const TABS: TabKey[] = ['overview', 'personality', 'career', 'blessedDay', 'spiritualPractice', 'sadaqah'];

function TabBar({ active, onChange, locale }: { active: TabKey; onChange: (k: TabKey) => void; locale: Locale }) {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1">
      {TABS.map((key) => {
        const isActive = key === active;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${
              isActive ? 'bg-gold/20 text-gold' : 'bg-white/5 text-slate-400'
            }`}
          >
            {pick(locale, SECTION_LABELS[key])}
          </button>
        );
      })}
    </div>
  );
}

export function ResultTabs({ profile, locale }: { profile: BurujProfile; locale: Locale }) {
  const [tab, setTab] = useState<TabKey>('overview');
  const personalityText = profile.personality[locale];

  return (
    <div className="flex flex-col gap-3">
      <TabBar active={tab} onChange={setTab} locale={locale} />

      {tab === 'overview' && (
        <div className="flex flex-col gap-3">
          <Card>
            <p className="text-xs font-medium text-slate-400">{pick(locale, PERSONALITY_LABELS.temperament)}</p>
            <p className="mt-1 text-sm text-slate-200">{personalityText.temperament}</p>
          </Card>
          <Card>
            <p className="text-xs font-medium text-slate-400">{pick(locale, PERSONALITY_LABELS.social_loved)}</p>
            <p className="mt-1 text-sm text-slate-200">{personalityText.social_loved}</p>
          </Card>
          <Card>
            <p className="text-xs font-medium text-slate-400">{pick(locale, SECTION_LABELS.blessedDay)}</p>
            <p className="mt-1 text-lg font-semibold text-gold">{pick(locale, profile.blessed_day.day)}</p>
            <ul className="mt-1 flex flex-col gap-1 text-sm text-slate-300">
              {pickList(locale, profile.blessed_day.best_for)
                .slice(0, 2)
                .map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-gold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
            </ul>
          </Card>
          <Card>
            <p className="text-xs font-medium text-slate-400">{pick(locale, CAREER_LABELS.principle)}</p>
            <p className="mt-1 text-sm text-slate-200">{pick(locale, profile.career.principle)}</p>
          </Card>
          <Card>
            <p className="text-xs font-medium text-slate-400">{pick(locale, SPIRITUAL_LABELS.divineName)}</p>
            <p dir="rtl" className="mt-1 text-lg text-gold">
              {profile.spiritual_practice.divine_names.arabic}
            </p>
            <p className="text-xs italic text-slate-400">{profile.spiritual_practice.divine_names.transliteration}</p>
            <p className="text-sm text-slate-300">{pick(locale, profile.spiritual_practice.divine_names.translation)}</p>
          </Card>
        </div>
      )}

      {tab === 'personality' && (
        <Card className="flex flex-col gap-3">
          {PERSONALITY_FIELDS.map((field) => (
            <div key={field}>
              <p className="text-xs font-medium text-slate-400">{pick(locale, PERSONALITY_LABELS[field])}</p>
              <p className="text-sm text-slate-200">{personalityText[field]}</p>
            </div>
          ))}
        </Card>
      )}

      {tab === 'career' && (
        <Card className="flex flex-col gap-4">
          <div>
            <p className="text-xs font-medium text-slate-400">{pick(locale, CAREER_LABELS.principle)}</p>
            <p className="text-sm text-slate-200">{pick(locale, profile.career.principle)}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">{pick(locale, CAREER_LABELS.traditional)}</p>
            <p className="text-sm text-slate-200">{pick(locale, profile.career.traditional)}</p>
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-slate-400">{pick(locale, CAREER_LABELS.modern)}</p>
            <div className="flex flex-col gap-2">
              {profile.career.modern_recommended[locale].map((cat) => (
                <div key={cat.category} className="rounded-xl bg-navy/60 p-2">
                  <p className="text-xs font-medium text-slate-300">
                    {cat.icon} {cat.category}
                  </p>
                  <ul className="mt-1 flex flex-col gap-0.5 text-xs text-slate-400">
                    {cat.items.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">{pick(locale, CAREER_LABELS.avoid)}</p>
            <p className="text-sm text-slate-200">{pick(locale, profile.career.avoid.modern)}</p>
          </div>
        </Card>
      )}

      {tab === 'blessedDay' && (
        <Card className="flex flex-col gap-3">
          <p className="text-lg font-semibold text-gold">{pick(locale, profile.blessed_day.day)}</p>
          <ul className="flex flex-col gap-1 text-sm text-slate-300">
            {pickList(locale, profile.blessed_day.best_for).map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-gold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-xl bg-navy/60 p-2 text-xs text-slate-400">
            {pickList(locale, profile.blessed_day.special_notes).map((note, i) => (
              <p key={i} className="py-0.5">
                {note}
              </p>
            ))}
          </div>
        </Card>
      )}

      {tab === 'spiritualPractice' && (
        <Card className="flex flex-col gap-3 text-sm">
          <div>
            <p className="text-xs font-medium text-slate-400">{pick(locale, SPIRITUAL_LABELS.practiceNight)}</p>
            <p className="text-slate-200">{pick(locale, profile.spiritual_practice.practice_night.primary)}</p>
            <p className="text-xs text-slate-500">{pick(locale, profile.spiritual_practice.practice_night.note)}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">{pick(locale, SPIRITUAL_LABELS.divineName)}</p>
            <p dir="rtl" className="text-lg text-gold">
              {profile.spiritual_practice.divine_names.arabic}
            </p>
            <p className="text-xs italic text-slate-400">{profile.spiritual_practice.divine_names.transliteration}</p>
            <p className="text-slate-300">{pick(locale, profile.spiritual_practice.divine_names.translation)}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">{pick(locale, SPIRITUAL_LABELS.quranicVerse)}</p>
            <p dir="rtl" className="text-lg text-gold">
              {profile.spiritual_practice.quranic_verse.arabic}
            </p>
            <p className="text-slate-300">
              {pick(locale, profile.spiritual_practice.quranic_verse.translation)} —{' '}
              <span className="text-slate-500">{profile.spiritual_practice.quranic_verse.reference}</span>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-navy/60 p-2">
              <p className="text-xs font-medium text-slate-400">{pick(locale, ANGEL_JINN_LABELS.angel)}</p>
              <p dir="rtl" className="text-base text-gold">
                {profile.spiritual_practice.angel.arabic}
              </p>
              <p className="text-xs text-slate-300">{pick(locale, profile.spiritual_practice.angel.name)}</p>
            </div>
            <div className="rounded-xl bg-navy/60 p-2">
              <p className="text-xs font-medium text-slate-400">{pick(locale, ANGEL_JINN_LABELS.jinn)}</p>
              <p dir="rtl" className="text-base text-gold">
                {profile.spiritual_practice.jinn.arabic}
              </p>
              <p className="text-xs text-slate-300">{pick(locale, profile.spiritual_practice.jinn.meaning)}</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">{pick(locale, SPIRITUAL_LABELS.instructions)}</p>
            <ol className="flex list-decimal flex-col gap-1 pl-4 text-slate-300">
              {pickList(locale, profile.spiritual_practice.instructions).map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </Card>
      )}

      {tab === 'sadaqah' && (
        <Card className="flex flex-col gap-4 text-sm">
          <div>
            <p className="text-xs font-medium text-slate-400">{pick(locale, SADAQAH_LABELS.monthly)}</p>
            <p className="text-slate-200">{pick(locale, profile.sadaqah.monthly.traditional)}</p>
            <p className="mt-1 text-xs text-slate-500">
              {pick(locale, SADAQAH_LABELS.frequency)}: {pick(locale, profile.sadaqah.monthly.frequency)}
            </p>
            <p className="text-xs text-slate-500">
              {pick(locale, SADAQAH_LABELS.purpose)}: {pick(locale, profile.sadaqah.monthly.purpose)}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">{pick(locale, SADAQAH_LABELS.lifetime)}</p>
            <p className="text-slate-200">{pick(locale, profile.sadaqah.lifetime.traditional)}</p>
            <p className="mt-1 text-xs font-medium text-slate-400">{pick(locale, SADAQAH_LABELS.components)}</p>
            <ul className="flex flex-col gap-0.5 text-xs text-slate-400">
              {pickList(locale, profile.sadaqah.lifetime.components).map((c, i) => (
                <li key={i}>• {c}</li>
              ))}
            </ul>
          </div>
        </Card>
      )}
    </div>
  );
}
