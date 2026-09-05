import type { DestinyResult } from '@/lib/abjad/coreCalculations';
import type { ZodiacIdentity } from '@/lib/abjad/zodiac';
import { pick, ELEMENT_NAME, NUMBERS_LABELS, type BurujProfile, type Locale } from '@/lib/abjad/buruj';

export function ResultHero({
  result,
  zodiac,
  profile,
  locale,
}: {
  result: DestinyResult;
  zodiac: ZodiacIdentity;
  profile: BurujProfile | null;
  locale: Locale;
}) {
  const elementName = profile ? pick(locale, ELEMENT_NAME[profile.element] ?? ELEMENT_NAME.fire) : null;

  const stats = [
    { label: pick(locale, NUMBERS_LABELS.personHadad), value: result.personKabir },
    ...(result.motherKabir > 0
      ? [{ label: pick(locale, NUMBERS_LABELS.motherHadad), value: result.motherKabir }]
      : []),
    { label: pick(locale, NUMBERS_LABELS.combinedHadad), value: result.combinedKabir },
    { label: pick(locale, NUMBERS_LABELS.lifeNumber), value: result.saghir },
  ];

  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-gold/20 bg-navy-card px-4 py-6">
      {/* Astrolabe-style zodiac badge, echoing the Deftere logo mark */}
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
        <span className="text-4xl text-gold">{zodiac.symbol}</span>
      </div>

      <div className="text-center">
        <h2 className="text-xl font-semibold text-gold">{zodiac[locale]}</h2>
        {profile && (
          <p className="mt-0.5 text-sm text-slate-400">
            {profile.element_emoji} {elementName}
          </p>
        )}
      </div>

      {profile && profile.colors.length > 0 && (
        <div className="flex gap-2">
          {profile.colors.map((c) => (
            <span key={c} className="h-5 w-5 rounded-full border border-white/20" style={{ backgroundColor: c }} />
          ))}
        </div>
      )}

      <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-white/5 bg-navy px-2 py-2 text-center">
            <p className="text-lg font-semibold text-gold">{s.value}</p>
            <p className="text-[10px] uppercase tracking-wide text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
