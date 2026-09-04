import { getTranslations } from 'next-intl/server';
import { DashboardCard } from './DashboardCard';

/**
 * Example content matching the reference design — NOT live ephemeris data.
 * The dashboard spec (spec §6) still needs either a new Asrar backend
 * endpoint or a ported hour/dignity derivation layer before these can be
 * real; see README "What's NOT wired up yet". Swap the static values below
 * for a live fetch once that's in place.
 */
export async function IlmAlNujumGrid() {
  const t = await getTranslations('dashboard');

  return (
    <div className="grid grid-cols-2 gap-3">
      <DashboardCard
        label={t('rulingPlanet')}
        content={
          <span>
            <span className="mr-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-gold/40 text-xs text-gold">
              ♀
            </span>
            Venus (الزهرة)
          </span>
        }
        subtitle="Love, beauty, peace, joy."
        badge={{ color: 'green', label: t('statusGood') }}
      />
      <DashboardCard
        label={t('planetaryHour')}
        content={
          <span>
            <span className="mr-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-gold/40 text-xs text-gold">
              ☉
            </span>
            Hour of Sun
          </span>
        }
        subtitle={`${t('countdown')} 10:00 PM`}
        badge={{ color: 'green', label: t('statusExcellent') }}
      />
      <DashboardCard label={t('nextPrayer')} content="Isha · 10:11 PM" subtitle="in 45m" />
      <DashboardCard
        label={t('tomorrow')}
        content="Saturday · 3:57 PM"
        subtitle=""
        badge={{ color: 'red', label: t('statusMalefic') }}
      />
    </div>
  );
}
