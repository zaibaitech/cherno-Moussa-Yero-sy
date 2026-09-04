import type { Locale } from '@/lib/i18n/config';

/**
 * Classical ʿIlm al-Nujūm planetary math — day rulers, Chaldean planetary
 * hours, and benefic/malefic nature. Deliberately excludes live ephemeris
 * (planet dignity from actual zodiac position): that needs a positional
 * ephemeris source this app doesn't have yet. What's here is still real,
 * deterministic astronomy/astrology, not placeholder data — it just answers
 * a coarser question ("which planet, and is it benefic by nature") than a
 * full dignity-aware system would.
 */

export type Planet = 'Sun' | 'Moon' | 'Mars' | 'Mercury' | 'Jupiter' | 'Venus' | 'Saturn';

export const PLANET_SYMBOL: Record<Planet, string> = {
  Sun: '☉',
  Moon: '☽',
  Mars: '♂',
  Mercury: '☿',
  Jupiter: '♃',
  Venus: '♀',
  Saturn: '♄',
};

export const PLANET_NAME: Record<Planet, Record<Locale, string>> = {
  Sun: { en: 'Sun', fr: 'Soleil', ar: 'الشمس' },
  Moon: { en: 'Moon', fr: 'Lune', ar: 'القمر' },
  Mars: { en: 'Mars', fr: 'Mars', ar: 'المريخ' },
  Mercury: { en: 'Mercury', fr: 'Mercure', ar: 'عطارد' },
  Jupiter: { en: 'Jupiter', fr: 'Jupiter', ar: 'المشتري' },
  Venus: { en: 'Venus', fr: 'Vénus', ar: 'الزهرة' },
  Saturn: { en: 'Saturn', fr: 'Saturne', ar: 'زحل' },
};

export const PLANET_BLURB: Record<Planet, Record<Locale, string>> = {
  Sun: { en: 'Vitality, leadership, visibility.', fr: 'Vitalité, leadership, visibilité.', ar: 'حيوية، قيادة، ظهور.' },
  Moon: { en: 'Intuition, emotion, family.', fr: 'Intuition, émotion, famille.', ar: 'حدس، عاطفة، أسرة.' },
  Mars: { en: 'Action, courage, drive.', fr: 'Action, courage, énergie.', ar: 'حركة، شجاعة، اندفاع.' },
  Mercury: { en: 'Communication, learning, travel.', fr: 'Communication, apprentissage, voyage.', ar: 'تواصل، تعلّم، سفر.' },
  Jupiter: { en: 'Growth, abundance, opportunity.', fr: 'Croissance, abondance, opportunité.', ar: 'نمو، وفرة، فرصة.' },
  Venus: { en: 'Love, beauty, peace, joy.', fr: 'Amour, beauté, paix, joie.', ar: 'حب، جمال، سلام، فرح.' },
  Saturn: { en: 'Discipline, structure, patience.', fr: 'Discipline, structure, patience.', ar: 'انضباط، تنظيم، صبر.' },
};

/** Chaldean order (slowest to fastest), the sequence planetary hours cycle through. */
const CHALDEAN_ORDER: Planet[] = ['Saturn', 'Jupiter', 'Mars', 'Sun', 'Venus', 'Mercury', 'Moon'];

const DAY_RULERS: Record<number, Planet> = {
  0: 'Sun',
  1: 'Moon',
  2: 'Mars',
  3: 'Mercury',
  4: 'Jupiter',
  5: 'Venus',
  6: 'Saturn',
};

export function getDayRuler(date: Date): Planet {
  return DAY_RULERS[date.getDay()];
}

function getPlanetForHour(dayRuler: Planet, hourNumber: number): Planet {
  const dayRulerIndex = CHALDEAN_ORDER.indexOf(dayRuler);
  return CHALDEAN_ORDER[(dayRulerIndex + hourNumber) % CHALDEAN_ORDER.length];
}

export type PlanetNature = 'saad' | 'nahs' | 'neutral';

/** Sa'd (benefic): Sun, Jupiter, Venus. Nahs (malefic): Saturn, Mars. Neutral: Moon, Mercury. */
export function getPlanetNature(planet: Planet): PlanetNature {
  if (planet === 'Sun' || planet === 'Jupiter' || planet === 'Venus') return 'saad';
  if (planet === 'Saturn' || planet === 'Mars') return 'nahs';
  return 'neutral';
}

export interface PlanetaryHourWindow {
  planet: Planet;
  hourNumber: number; // 1-24
  startTime: Date;
  endTime: Date;
  isDaytime: boolean;
}

/**
 * All 24 planetary hours for one sunrise-to-next-sunrise cycle, in order.
 */
export function getAllPlanetaryHours(sunrise: Date, sunset: Date, nextSunrise: Date): PlanetaryHourWindow[] {
  const dayRuler = getDayRuler(sunrise);
  const dayHourDuration = (sunset.getTime() - sunrise.getTime()) / 12;
  const nightHourDuration = (nextSunrise.getTime() - sunset.getTime()) / 12;

  const hours: PlanetaryHourWindow[] = [];
  for (let h = 0; h < 12; h++) {
    hours.push({
      planet: getPlanetForHour(dayRuler, h),
      hourNumber: h + 1,
      startTime: new Date(sunrise.getTime() + h * dayHourDuration),
      endTime: new Date(sunrise.getTime() + (h + 1) * dayHourDuration),
      isDaytime: true,
    });
  }
  for (let h = 0; h < 12; h++) {
    hours.push({
      planet: getPlanetForHour(dayRuler, h + 12),
      hourNumber: h + 13,
      startTime: new Date(sunset.getTime() + h * nightHourDuration),
      endTime: new Date(sunset.getTime() + (h + 1) * nightHourDuration),
      isDaytime: false,
    });
  }
  return hours;
}

/**
 * The planetary hour containing `now`, plus a countdown to its end.
 * `sunrise`/`sunset` must be the boundaries of the cycle `now` falls in
 * (yesterday's sunset->today's sunrise if `now` is before today's sunrise).
 */
export function getCurrentPlanetaryHour(
  sunrise: Date,
  sunset: Date,
  nextSunrise: Date,
  now: Date,
): { hour: PlanetaryHourWindow; countdownSeconds: number } {
  const hours = getAllPlanetaryHours(sunrise, sunset, nextSunrise);
  const current = hours.find((h) => now >= h.startTime && now < h.endTime) ?? hours[hours.length - 1];
  const countdownSeconds = Math.max(0, Math.floor((current.endTime.getTime() - now.getTime()) / 1000));
  return { hour: current, countdownSeconds };
}

/** The soonest Sa'd (benefic) hour in a day — always exists since 3 of the 7 planets are benefic. */
export function getBestHourOfDay(sunrise: Date, sunset: Date, nextSunrise: Date): PlanetaryHourWindow {
  const hours = getAllPlanetaryHours(sunrise, sunset, nextSunrise);
  return hours.find((h) => getPlanetNature(h.planet) === 'saad') ?? hours[0];
}

export function formatCountdown(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m`;
  return `${Math.max(seconds, 0)}s`;
}
