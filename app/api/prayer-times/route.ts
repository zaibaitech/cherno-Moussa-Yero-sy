import { NextResponse } from 'next/server';

/**
 * Proxies the Aladhan API (https://aladhan.com/prayer-times-api, free, no
 * key) so the browser doesn't call a third-party host directly and so
 * Next can cache each date+location combination server-side.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = Number(searchParams.get('lat'));
  const lng = Number(searchParams.get('lng'));
  const date = searchParams.get('date'); // YYYY-MM-DD

  if (!Number.isFinite(lat) || !Number.isFinite(lng) || !date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'lat, lng, and date (YYYY-MM-DD) are required' }, { status: 400 });
  }

  const [year, month, day] = date.split('-');
  const aladhanDate = `${day}-${month}-${year}`;

  const url = `https://api.aladhan.com/v1/timings/${aladhanDate}?latitude=${lat}&longitude=${lng}&method=3`;

  const res = await fetch(url, { next: { revalidate: 21600 } });
  if (!res.ok) {
    return NextResponse.json({ error: 'Prayer time lookup failed' }, { status: 502 });
  }

  const json = await res.json();
  const timings = json?.data?.timings;
  if (!timings) {
    return NextResponse.json({ error: 'Prayer time lookup failed' }, { status: 502 });
  }

  return NextResponse.json({
    date,
    timings: {
      Fajr: timings.Fajr,
      Sunrise: timings.Sunrise,
      Dhuhr: timings.Dhuhr,
      Asr: timings.Asr,
      Maghrib: timings.Maghrib,
      Isha: timings.Isha,
    },
  });
}
