'use client';

import { useEffect, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { DashboardCard } from './DashboardCard';
import {
  PLANET_SYMBOL,
  PLANET_NAME,
  PLANET_BLURB,
  getDayRuler,
  getPlanetNature,
  getCurrentPlanetaryHour,
  getBestHourOfDay,
  formatCountdown,
  type Planet,
  type PlanetaryHourWindow,
} from '@/lib/planetary';
import type { Locale } from '@/lib/i18n/config';

type Status = 'locating' | 'loading' | 'ready' | 'denied' | 'unsupported' | 'error';

interface PrayerTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

interface DayBoundaries {
  date: Date; // midnight of that calendar day
  timings: PrayerTimings;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function toDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Attaches a "HH:MM" (optionally with a trailing " (TZ)") clock time to the given calendar day. */
function clockOn(day: Date, hhmm: string): Date {
  const match = hhmm.match(/(\d{1,2}):(\d{2})/);
  const result = new Date(day);
  if (!match) return result;
  result.setHours(Number(match[1]), Number(match[2]), 0, 0);
  return result;
}

async function fetchTimings(lat: number, lng: number, day: Date): Promise<DayBoundaries | null> {
  const res = await fetch(`/api/prayer-times?lat=${lat}&lng=${lng}&date=${toDateStr(day)}`);
  if (!res.ok) return null;
  const json = await res.json();
  if (!json?.timings) return null;
  return { date: startOfDay(day), timings: json.timings as PrayerTimings };
}

interface Boundaries {
  yesterday: DayBoundaries;
  today: DayBoundaries;
  tomorrow: DayBoundaries;
  dayAfter: DayBoundaries;
}

const PRAYER_KEYS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const;

function timeFormatter(locale: string) {
  return new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' });
}

export function IlmAlNujumGrid() {
  const locale = useLocale() as Locale;
  const t = useTranslations('dashboard');

  const [status, setStatus] = useState<Status>('locating');
  const [boundaries, setBoundaries] = useState<Boundaries | null>(null);
  const [now, setNow] = useState(() => new Date());
  const [retryCount, setRetryCount] = useState(0);

  // Always available, no network needed: today's classical day ruler.
  const dayRuler = useMemo(() => getDayRuler(new Date()), []);

  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setStatus('unsupported');
      return;
    }
    setStatus('locating');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setStatus('loading');
        const today = startOfDay(new Date());
        Promise.all([
          fetchTimings(latitude, longitude, addDays(today, -1)),
          fetchTimings(latitude, longitude, today),
          fetchTimings(latitude, longitude, addDays(today, 1)),
          fetchTimings(latitude, longitude, addDays(today, 2)),
        ])
          .then(([yesterday, todayB, tomorrow, dayAfter]) => {
            if (!yesterday || !todayB || !tomorrow || !dayAfter) {
              setStatus('error');
              return;
            }
            setBoundaries({ yesterday, today: todayB, tomorrow, dayAfter });
            setStatus('ready');
          })
          .catch(() => setStatus('error'));
      },
      () => setStatus('denied'),
      { timeout: 10000 },
    );
  }, [retryCount]);

  // Recompute the countdown display every 30s without refetching.
  useEffect(() => {
    if (status !== 'ready') return;
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, [status]);

  const live = useMemo(() => {
    if (!boundaries) return null;

    const todaySunrise = clockOn(boundaries.today.date, boundaries.today.timings.Sunrise);
    const currentCycle =
      now < todaySunrise
        ? {
            sunrise: clockOn(boundaries.yesterday.date, boundaries.yesterday.timings.Sunrise),
            sunset: clockOn(boundaries.yesterday.date, boundaries.yesterday.timings.Maghrib),
            nextSunrise: todaySunrise,
          }
        : {
            sunrise: todaySunrise,
            sunset: clockOn(boundaries.today.date, boundaries.today.timings.Maghrib),
            nextSunrise: clockOn(boundaries.tomorrow.date, boundaries.tomorrow.timings.Sunrise),
          };

    const { hour: currentHour, countdownSeconds } = getCurrentPlanetaryHour(
      currentCycle.sunrise,
      currentCycle.sunset,
      currentCycle.nextSunrise,
      now,
    );

    const todayPrayers = PRAYER_KEYS.map((key) => ({
      key,
      time: clockOn(boundaries.today.date, boundaries.today.timings[key]),
    }));
    const upcoming = todayPrayers.find((p) => p.time > now);
    const nextPrayer = upcoming ?? {
      key: 'Fajr' as const,
      time: clockOn(boundaries.tomorrow.date, boundaries.tomorrow.timings.Fajr),
    };
    const nextPrayerCountdown = Math.max(0, Math.floor((nextPrayer.time.getTime() - now.getTime()) / 1000));

    const tomorrowBestHour = getBestHourOfDay(
      clockOn(boundaries.tomorrow.date, boundaries.tomorrow.timings.Sunrise),
      clockOn(boundaries.tomorrow.date, boundaries.tomorrow.timings.Maghrib),
      clockOn(boundaries.dayAfter.date, boundaries.dayAfter.timings.Sunrise),
    );

    return { currentHour, countdownSeconds, nextPrayer, nextPrayerCountdown, tomorrowBestHour };
  }, [boundaries, now]);

  const fmt = timeFormatter(locale);
  const natureBadge = (planet: Planet) => {
    const nature = getPlanetNature(planet);
    if (nature === 'saad') return { color: 'green' as const, label: t('statusExcellent') };
    if (nature === 'nahs') return { color: 'red' as const, label: t('statusMalefic') };
    return { color: 'amber' as const, label: t('statusNeutral') };
  };

  const planetLabel = (planet: Planet) => {
    const name = PLANET_NAME[planet][locale];
    if (locale === 'ar') return name;
    return `${name} (${PLANET_NAME[planet].ar})`;
  };

  const PlanetGlyph = ({ planet }: { planet: Planet }) => (
    <span className="mr-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-gold/40 text-xs text-gold">
      {PLANET_SYMBOL[planet]}
    </span>
  );

  const isSettledWithoutLocation = status === 'denied' || status === 'unsupported' || status === 'error';
  const locationHint = isSettledWithoutLocation ? (
    <p className="text-[11px] text-slate-500">{t('locationUnavailable')}</p>
  ) : null;
  // Loading… only while a fetch could still resolve; once settled without a
  // result (denied/unsupported/failed), say so instead of loading forever.
  const pendingText = isSettledWithoutLocation ? '—' : t('loading');

  const hourContent = (hour: PlanetaryHourWindow) => (
    <span>
      <PlanetGlyph planet={hour.planet} />
      {t('hourOf', { planet: PLANET_NAME[hour.planet][locale] })}
    </span>
  );

  return (
    <div className="grid grid-cols-2 gap-2">
      <DashboardCard
        label={t('rulingPlanet')}
        content={
          <span>
            <PlanetGlyph planet={dayRuler} />
            {planetLabel(dayRuler)}
          </span>
        }
        subtitle={PLANET_BLURB[dayRuler][locale]}
        badge={natureBadge(dayRuler)}
      />

      <DashboardCard
        label={t('planetaryHour')}
        content={live ? hourContent(live.currentHour) : pendingText}
        subtitle={live ? t('endsIn', { time: formatCountdown(live.countdownSeconds) }) : ''}
        badge={live ? natureBadge(live.currentHour.planet) : undefined}
      />

      <DashboardCard
        label={t('nextPrayer')}
        content={live ? `${t(`prayer${live.nextPrayer.key}`)} · ${fmt.format(live.nextPrayer.time)}` : pendingText}
        subtitle={live ? t('in', { time: formatCountdown(live.nextPrayerCountdown) }) : ''}
      />

      <DashboardCard
        label={t('tomorrow')}
        content={live ? hourContent(live.tomorrowBestHour) : pendingText}
        subtitle={
          live ? `${fmt.format(live.tomorrowBestHour.startTime)} – ${fmt.format(live.tomorrowBestHour.endTime)}` : ''
        }
        badge={live ? { color: 'green', label: t('statusExcellent') } : undefined}
      />

      {locationHint && status !== 'loading' && status !== 'locating' && (
        <div className="col-span-2 flex items-center justify-between rounded-xl border border-white/5 bg-navy-card px-3 py-2">
          {locationHint}
          <button
            type="button"
            onClick={() => {
              setBoundaries(null);
              setRetryCount((c) => c + 1);
            }}
            className="shrink-0 rounded-lg border border-gold/40 px-2 py-1 text-[11px] font-medium text-gold"
          >
            {t('enableLocation')}
          </button>
        </div>
      )}
    </div>
  );
}
