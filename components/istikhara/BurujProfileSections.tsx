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
  type BurujProfile,
  type Locale,
} from '@/lib/abjad/buruj';

function SectionHeader({ title, open, onToggle }: { title: string; open: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className="flex w-full items-center justify-between py-1 text-left">
      <h3 className="text-sm font-semibold text-gold">{title}</h3>
      <span className="text-slate-400">{open ? '−' : '+'}</span>
    </button>
  );
}

export function BurujProfileSections({ profile, locale }: { profile: BurujProfile; locale: Locale }) {
  const [open, setOpen] = useState<Record<string, boolean>>({ personality: true });
  const toggle = (key: string) => setOpen((o) => ({ ...o, [key]: !o[key] }));

  const personalityText = profile.personality[locale];

  return (
    <div className="flex flex-col gap-3">
      {/* Personality */}
      <Card>
        <SectionHeader
          title={pick(locale, SECTION_LABELS.personality)}
          open={!!open.personality}
          onToggle={() => toggle('personality')}
        />
        {open.personality && (
          <div className="mt-3 flex flex-col gap-3">
            {PERSONALITY_FIELDS.map((field) => (
              <div key={field}>
                <p className="text-xs font-medium text-slate-400">{pick(locale, PERSONALITY_LABELS[field])}</p>
                <p className="text-sm text-slate-200">{personalityText[field]}</p>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Career */}
      <Card>
        <SectionHeader
          title={pick(locale, SECTION_LABELS.career)}
          open={!!open.career}
          onToggle={() => toggle('career')}
        />
        {open.career && (
          <div className="mt-3 flex flex-col gap-4">
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
          </div>
        )}
      </Card>

      {/* Blessed Day */}
      <Card>
        <SectionHeader
          title={pick(locale, SECTION_LABELS.blessedDay)}
          open={!!open.blessedDay}
          onToggle={() => toggle('blessedDay')}
        />
        {open.blessedDay && (
          <div className="mt-3 flex flex-col gap-3">
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
          </div>
        )}
      </Card>

      {/* Spiritual Practice */}
      <Card>
        <SectionHeader
          title={pick(locale, SECTION_LABELS.spiritualPractice)}
          open={!!open.spiritual}
          onToggle={() => toggle('spiritual')}
        />
        {open.spiritual && (
          <div className="mt-3 flex flex-col gap-3 text-sm">
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
            <div>
              <p className="text-xs font-medium text-slate-400">{pick(locale, SPIRITUAL_LABELS.instructions)}</p>
              <ol className="flex list-decimal flex-col gap-1 pl-4 text-slate-300">
                {pickList(locale, profile.spiritual_practice.instructions).map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </Card>

      {/* Sadaqah */}
      <Card>
        <SectionHeader
          title={pick(locale, SECTION_LABELS.sadaqah)}
          open={!!open.sadaqah}
          onToggle={() => toggle('sadaqah')}
        />
        {open.sadaqah && (
          <div className="mt-3 flex flex-col gap-4 text-sm">
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
          </div>
        )}
      </Card>
    </div>
  );
}
