import { useTranslations, useLocale } from 'next-intl';
import { Card } from '@/components/ui/Card';
import { pick, ELEMENT_NAME, type Locale } from '@/lib/abjad/buruj';
import { ELEMENT_EMOJI, type TextProfile, type ElementType } from '@/lib/abjad/textAnalysis';

const ELEMENT_BAR_COLOR: Record<ElementType, string> = {
  fire: '#f97316',
  water: '#38bdf8',
  air: '#67e8f9',
  earth: '#34d399',
};

export function CalculatorResult({ profile }: { profile: TextProfile }) {
  const t = useTranslations('calculator');
  const locale = useLocale() as Locale;

  const numbers = [
    { label: t('kabir'), value: profile.kabir },
    { label: t('saghir'), value: profile.saghir },
    { label: t('sirr'), value: profile.sirr },
    { label: t('wusta'), value: profile.wusta },
    { label: t('kamal'), value: profile.kamal },
    { label: t('bast'), value: profile.bast },
  ];

  const elements: ElementType[] = ['fire', 'water', 'air', 'earth'];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-gold/20 bg-navy-card px-4 py-6">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
            <circle cx="50" cy="50" r="47" fill="none" stroke="#D4AF37" strokeOpacity="0.35" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="39" fill="none" stroke="#D4AF37" strokeOpacity="0.2" strokeWidth="1" />
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const x1 = 50 + 44 * Math.sin(angle);
              const y1 = 50 - 44 * Math.cos(angle);
              const x2 = 50 + 40 * Math.sin(angle);
              const y2 = 50 - 40 * Math.cos(angle);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D4AF37" strokeOpacity="0.4" strokeWidth="1" />;
            })}
          </svg>
          <span className="text-4xl text-gold">{profile.zodiac?.symbol ?? '✦'}</span>
        </div>

        <div className="text-center">
          {profile.zodiac && <h2 className="text-xl font-semibold text-gold">{profile.zodiac[locale]}</h2>}
          <p className="mt-0.5 text-sm text-slate-400">
            {ELEMENT_EMOJI[profile.element]} {pick(locale, ELEMENT_NAME[profile.element])}
          </p>
        </div>

        <div className="grid w-full grid-cols-3 gap-2">
          {numbers.map((n) => (
            <div key={n.label} className="rounded-xl border border-white/5 bg-navy px-2 py-2 text-center">
              <p className="text-lg font-semibold text-gold">{n.value}</p>
              <p className="text-[10px] uppercase tracking-wide text-slate-500">{n.label}</p>
            </div>
          ))}
        </div>
      </div>

      <Card className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-200">{t('elementalComposition')}</p>
          <p className="text-xs text-slate-500">
            {t('balanceScore')}: {profile.elemental.balanceScore}%
          </p>
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
        {profile.elemental.dominantElement && (
          <p className="text-xs text-slate-500">
            {t('dominantElement')}: {pick(locale, ELEMENT_NAME[profile.elemental.dominantElement])}
            {profile.elemental.weakestElement &&
              ` · ${t('weakestElement')}: ${pick(locale, ELEMENT_NAME[profile.elemental.weakestElement])}`}
          </p>
        )}
      </Card>

      {profile.letterFrequency.length > 0 && (
        <Card>
          <p className="mb-2 text-sm font-medium text-slate-200">{t('letterFrequency')}</p>
          <div className="flex flex-wrap gap-1.5">
            {profile.letterFrequency.map((f) => (
              <span
                key={f.letter}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-navy px-2 py-1 text-xs"
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ELEMENT_BAR_COLOR[f.element] }} />
                <span dir="rtl" className="text-sm text-slate-100">
                  {f.letter}
                </span>
                <span className="text-slate-500">
                  ×{f.count} · {f.value}
                </span>
              </span>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
