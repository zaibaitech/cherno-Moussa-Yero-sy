'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Card } from '@/components/ui/Card';
import { getLetterBreakdown } from '@/lib/abjad/coreCalculations';
import {
  soulData,
  pick,
  getArchetype,
  getContextMeaning,
  getSeverityColor,
  SOUL_TAGS,
  RELATIONSHIP_CONTEXT_LABELS,
  RELATIONSHIP_CONTEXT_TITLE,
  type Locale,
  type RelationshipContext,
  type SoulNumber,
} from '@/lib/abjad/soul-connection';
import { SoulConnectionRing } from './SoulConnectionRing';

const OF_NINE: Record<Locale, string> = { en: 'OF NINE', fr: 'SUR NEUF', ar: 'من تسعة' };
const CONTEXTS: RelationshipContext[] = ['universal', 'marriage', 'friendship', 'family', 'work'];

export function SoulConnectionSection({
  soulNumber,
  person1Name,
  person1Arabic,
  person1Kabir,
  person2Name,
  person2Arabic,
  person2Kabir,
}: {
  soulNumber: SoulNumber;
  person1Name: string;
  person1Arabic: string;
  person1Kabir: number;
  person2Name: string;
  person2Arabic: string;
  person2Kabir: number;
}) {
  const locale = useLocale() as Locale;
  const [context, setContext] = useState<RelationshipContext>('universal');
  const [showFormula, setShowFormula] = useState(false);

  const archetype = getArchetype(soulNumber);
  const contextMeaning = context === 'marriage' ? undefined : getContextMeaning(soulNumber, context);
  const useArchetype = context === 'marriage' || !contextMeaning;

  // Intensity/severity is a function of the soul number itself in the source
  // data (every context agrees), so one color mapping covers both.
  const color = getSeverityColor(soulNumber);

  const breakdown1 = getLetterBreakdown(person1Arabic);
  const breakdown2 = getLetterBreakdown(person2Arabic);
  const sum = person1Kabir + person2Kabir + 7;

  return (
    <Card className="flex flex-col gap-4">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-100">{pick(locale, soulData.title)}</h3>
          <span
            className="rounded-full px-2 py-0.5 text-[11px] font-medium"
            style={{ backgroundColor: `${color}20`, color }}
          >
            {pick(locale, soulData.independentChip)}
          </span>
        </div>
        <p className="text-xs text-slate-400">{pick(locale, soulData.subtitle)}</p>
      </div>

      <div>
        <p className="mb-2 text-xs text-slate-400">{pick(locale, RELATIONSHIP_CONTEXT_TITLE)}</p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CONTEXTS.map((c) => {
            const isSelected = c === context;
            return (
              <button
                key={c}
                onClick={() => setContext(c)}
                className="shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-xs"
                style={
                  isSelected
                    ? { backgroundColor: `${color}20`, borderColor: color, color, fontWeight: 600 }
                    : { borderColor: 'rgba(255,255,255,0.1)', color: '#94a3b8' }
                }
              >
                {pick(locale, RELATIONSHIP_CONTEXT_LABELS[c])}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 py-2">
        <SoulConnectionRing value={soulNumber} activeColor={color} ofNineLabel={OF_NINE[locale]} />
        {archetype && (
          <p className="text-lg font-semibold" style={{ color }}>
            {pick(locale, archetype.title)}
          </p>
        )}
        <p className="text-center text-sm text-slate-300">
          {useArchetype ? pick(locale, archetype.oneLine) : pick(locale, contextMeaning!.short)}
        </p>
      </div>

      {useArchetype && (
        <div className="flex flex-wrap justify-center gap-2">
          {SOUL_TAGS[soulNumber].map((key) => (
            <span
              key={key}
              className="rounded-full border px-2 py-0.5 text-[11px]"
              style={{ borderColor: `${color}40`, backgroundColor: `${color}15`, color }}
            >
              {pick(locale, soulData.tags[key])}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-3 border-t border-white/5 pt-3">
        <MeaningBlock
          label={pick(locale, soulData.blocks.meaning)}
          text={useArchetype ? pick(locale, archetype.meaning) : pick(locale, contextMeaning!.meaning)}
          color="#3b82f6"
        />
        {context === 'marriage' && useArchetype && (
          <MeaningBlock
            label={pick(locale, soulData.blocks.marriageOutlook)}
            text={pick(locale, archetype.marriageOutlook)}
            color="#8b5cf6"
          />
        )}
        <MeaningBlock
          label={pick(locale, soulData.blocks.watchOut)}
          text={useArchetype ? pick(locale, archetype.watchOut) : pick(locale, contextMeaning!.watchOut)}
          color="#f59e0b"
        />
        <MeaningBlock
          label={pick(locale, soulData.blocks.keyToSuccess)}
          text={useArchetype ? pick(locale, archetype.keyToSuccess) : pick(locale, contextMeaning!.keyToSuccess)}
          color="#22c55e"
        />
      </div>

      <p className="border-t border-white/5 pt-3 text-xs text-slate-500">{pick(locale, soulData.disclaimer)}</p>

      <button
        onClick={() => setShowFormula((v) => !v)}
        className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-300"
      >
        {pick(locale, soulData.howCalculated.title)}
        <span>{showFormula ? '−' : '+'}</span>
      </button>

      {showFormula && (
        <div className="flex flex-col gap-3 rounded-xl bg-navy/60 p-3 text-xs">
          <LetterRow name={person1Name} breakdown={breakdown1} total={person1Kabir} />
          <LetterRow name={person2Name} breakdown={breakdown2} total={person2Kabir} />
          <div className="flex justify-between text-slate-400">
            <span>{pick(locale, soulData.howCalculated.constant)}</span>
            <span className="font-medium text-slate-200">+7</span>
          </div>
          <p className="text-center font-medium text-gold">
            ({person1Kabir} + {person2Kabir} + 7) → {sum} → {sum % 9 === 0 ? 9 : sum % 9}
          </p>
          <p className="text-slate-500">{pick(locale, soulData.howCalculated.explanation)}</p>
        </div>
      )}
    </Card>
  );
}

function MeaningBlock({ label, text, color }: { label: string; text: string; color: string }) {
  return (
    <div>
      <p className="text-xs font-semibold" style={{ color }}>
        {label}
      </p>
      <p className="mt-0.5 text-sm text-slate-300">{text}</p>
    </div>
  );
}

function LetterRow({
  name,
  breakdown,
  total,
}: {
  name: string;
  breakdown: { char: string; value: number }[];
  total: number;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-slate-300">{name}</span>
        <span className="font-medium text-slate-100">{total}</span>
      </div>
      <div className="flex flex-wrap gap-1.5" dir="rtl">
        {breakdown.map((b, i) => (
          <span key={i} className="rounded-md border border-white/10 bg-navy-card px-2 py-1 text-[11px] text-slate-300">
            {b.char} = {b.value}
          </span>
        ))}
      </div>
    </div>
  );
}
