# Deftere

A standalone web app built around one named Asrar teacher/cheikh (working
identity: **Cherno Moussa Yero Sy**) — his TV/YouTube teaching, manuscripts,
and authored books — as its own brand, separate from Asrar/Asrariya.

This is the Phase 1 MVP scaffold per the build spec. Stack: Next.js 14 (App
Router) + TypeScript + Tailwind + next-intl, targeting Supabase for
auth/storage/books once credentials exist.

## What's here (Phase 1 scaffold)

- **Dashboard (`/`, Ilm al-Nujum)** — dark navy/gold card layout, Hijri date
  header, ruling planet / next prayer / planetary hour / tomorrow cards, and
  a Quick Start row. Cards are placeholders ("coming soon") until wired to a
  live ephemeris source — see [Open items](#open-items) below.
- **Istikhara (`/istikhara`)** — name + mother's-name form, running the
  ported abjad/zodiac engine live, framed as a question-guided reading (not
  "Who Am I"). Result content is a **placeholder**, not the cheikh's actual
  teaching — see the attribution note below.
- **Calculator (`/calculator`)** — blocked state; the cheikh's manuscript
  method hasn't been transcribed yet (spec §2/§8.5).
- **Books (`/books`)** — empty catalog + a working "Pay with Wave" button
  using the static link (Phase 1 manual-confirmation flow, spec §5).
- **i18n** — FR (default) / EN / AR via `next-intl`, with real RTL layout
  (not just flipped text) driven by `dir="rtl"` on `<html>` per locale.

## Ported from asrar-mobile

Per spec §0, this doesn't reimplement the abjad engine — it ports the
verified logic directly:

- `lib/abjad/coreCalculations.ts`, `lib/abjad/abjad-maps.ts`, `lib/abjad/zodiac.ts`
  ← `utils/coreCalculations.ts`, `constants/abjad-maps.ts`,
  `constants/identityMaps.ts` in `zaibaitech/asrar-mobile`. This is a pure,
  dependency-free calculation — no API call needed, it's copied as-is.

## ⚠️ Important discrepancy found (spec §1, §8.6)

The spec asks whether Asrariya's existing Sadaqah/dignity content — sourced
from **Cheikh Mahdiyou Niane** — is the same person as this app's cheikh.
Inspecting `asrar-mobile/data/zodiacSadaqahData.ts` confirms every entry is
explicitly `authorizedBy: 'Cheikh Mahdiyou Niane'`.

This repo is named for **Cherno Moussa Yero Sy** — a different name. Unless
told otherwise, **treat them as two different scholars**: none of
Asrariya's existing Sadaqah/"Who Am I" interpretive content may be reused or
relicensed here (only the underlying abjad math is shared). All Istikhara
result text and Calculator content in `content/` must come fresh from Cherno
Moussa Yero Sy's own manuscripts/teaching, per §2. `content/istikhara-readings.ts`
is placeholder text for every sign, clearly marked as such, pending that
material. **Flag this to confirm before shipping real content.**

## What's NOT wired up yet

- **Ephemeris / ruling planet / planetary hour / dignity** (spec §6): the
  asrar-mobile research shows this logic runs **on-device** in the RN app
  (via `astronomy-engine`), not behind an API. The one real backend endpoint,
  `supabase/functions/ephemeris`, returns raw planetary *positions* with
  caching — it does not expose ruling-planet/planetary-hour/dignity directly.
  To make the Deftere dashboard live, either (a) call that endpoint and port
  the hour/dignity derivation layer here, or (b) get a new edge function
  added to the Asrar backend that exposes the derived values directly.
  Confirm which with the backend owner before building this out — dashboard
  cards currently render a "coming soon" placeholder instead of guessing.
- **Supabase** — no project/keys yet; `.env.example` lists what's needed.
- **Books** — catalog is empty pending §8.3 (pricing, download vs.
  in-app-only reader).
- **Wave Business merchant account** — currently using the generic static
  link from the spec; §8.4 asks whether this becomes a proper merchant
  account in the cheikh's name.

## Open questions carried over from the spec (§8)

1. ~~App name~~ — resolved: **Deftere**.
2. ~~Istikhara model~~ — resolved: classical name-based, reusing the abjad engine.
3. Book rights: downloadable files vs. in-app-only reader; pricing per title vs. bundle.
4. Wave Business merchant account setup.
5. Which manuscript sections are Calculator methods vs. Books teaching content.
6. **Confirm/deny**: is Cherno Moussa Yero Sy the same person as Cheikh
   Mahdiyou Niane (attributed on Asrariya's existing Sadaqah content)? See
   the discrepancy note above — this blocks reusing any existing content.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run typecheck
```
