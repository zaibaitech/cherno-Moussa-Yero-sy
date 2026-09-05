import { NextResponse } from 'next/server';

/**
 * Server-side proxy to the free public Al-Quran Cloud API for a single
 * ayah's Arabic text — kept server-side (like /api/buruj/[index]) so the
 * upstream URL/behavior lives in one place rather than being fetched
 * directly from client code. Returns { text: null } rather than an error
 * status on any upstream failure, so the caller can show an honest
 * "couldn't load the verse text" message alongside the still-valid
 * Quran.com link, rather than silently substituting placeholder text that
 * could be mistaken for the real verse.
 */
export async function GET(_req: Request, context: { params: Promise<{ surah: string; ayah: string }> }) {
  const { surah, ayah } = await context.params;

  try {
    const res = await fetch(`https://api.alquran.cloud/v1/ayah/${surah}:${ayah}/ar.asad`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 60 * 60 * 24 * 30 }, // verse text never changes; cache a month
    });
    if (!res.ok) throw new Error(`upstream ${res.status}`);

    const data = await res.json();
    const text = data?.data?.text;
    if (typeof text !== 'string' || !text) throw new Error('unexpected response shape');

    return NextResponse.json({ text });
  } catch {
    return NextResponse.json({ text: null });
  }
}
