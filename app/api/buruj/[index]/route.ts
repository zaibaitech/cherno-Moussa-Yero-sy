import { NextResponse } from 'next/server';
import burujDataRaw from '@/content/buruj-data.json';

/**
 * Serves one sign's Buruj profile from content/buruj-data.json, keeping the
 * full ~320KB, 12-sign dataset server-side only — the client fetches just
 * the one profile it needs instead of bundling all twelve.
 */
export async function GET(_req: Request, context: { params: Promise<{ index: string }> }) {
  const { index } = await context.params;
  const data = burujDataRaw as { buruj_data: Record<string, unknown> };
  const profile = data.buruj_data[index];

  if (!profile) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(profile);
}
