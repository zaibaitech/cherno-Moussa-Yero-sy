# Deftere

A standalone web app built around one named Asrar teacher/cheikh (working
identity: **Cherno Moussa Yero Sy**) — his TV/YouTube teaching, manuscripts,
and authored books — as its own brand, separate from Asrar/Asrariya.

This is the Phase 1 MVP scaffold per the build spec. Stack: Next.js 14 (App
Router) + TypeScript + Tailwind + next-intl, targeting Supabase for
auth/storage/books once credentials exist.

## What's here (Phase 1 scaffold)

- **Dashboard (`/`, Ilm al-Nujum)** — redesigned to match a supplied
  reference layout: two-row header (logo + FR/EN/AR language-pill switcher,
  then title/date + search + settings), a 2×2 ruling-planet/planetary-hour/
  next-prayer/tomorrow grid with status badges, and a horizontally-scrolling
  "Manuscript Marketplace" strip. **The 2×2 grid's content is static example
  data matching the reference design, not live** — the ephemeris/dignity
  backend still isn't wired up (see "What's NOT wired up yet" below); swap
  `IlmAlNujumGrid.tsx`'s hardcoded values for a real fetch once that exists.
  The marketplace pulls from `content/books.ts` (3 sample entries) and
  renders a generated gradient placeholder in place of real cover art.
- **Istikhara (`/istikhara`)** — name + mother's-name form, running the
  ported abjad/zodiac engine live, framed as a question-guided reading (not
  "Who Am I"). Result content is now the **full per-sign profile** ported
  from asrar-mobile's `data/burujData.json` — Personality (11 facets),
  Career (traditional + modern paths, what to avoid), Blessed Day, Spiritual
  Practice (divine name, Qur'anic verse, angel, jinn, ritual instructions),
  and Sadaqah (monthly + lifetime) — all trilingual, all 12 signs. See the
  attribution note below on this content's sourcing.
- **Calculator (`/calculator`)** — blocked state; the cheikh's manuscript
  method hasn't been transcribed yet (spec §2/§8.5).
- **Compatibility (`/compatibility`)** — name-vs-name harmony, ported live
  from asrar-mobile's "4-method" person-to-person engine (Soul Connection,
  Elemental Temperament, Planetary Cosmic, Daily Interaction). Unlike
  Istikhara, this is generic algorithmic output with no cheikh attribution
  in the source app, so it's fully live — no placeholder content. Soul
  Connection carries its own rich, context-aware content (Universal /
  Marriage / Friendship / Family / Work), a 9-bead ring visual, and a
  letter-by-letter calculation breakdown — ported from a richer content
  layer (`services/compatibility/soulConnectionMeanings.ts` +
  `soulArchetypes.ts` + the real `compatibility.soul.*` translation strings)
  discovered after an initial pass had only ported the flatter, generic
  per-remainder descriptions from `relationshipCompatibility.ts`.
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
- `lib/abjad/compatibility.ts`, `lib/abjad/compatibility-constants.ts`
  ← `utils/relationshipCompatibility.ts`, `constants/compatibility.ts`,
  `types/compatibility.ts` in `zaibaitech/asrar-mobile` — the name-vs-name
  "4-method" compatibility engine (Soul Connection / Elemental Temperament /
  Planetary Cosmic / Daily Interaction), reusing each person's own Kabir
  total from the abjad engine above (mother's name isn't used here, matching
  the source app's person-to-person flow). Pure and dependency-free like the
  abjad engine, and — unlike Istikhara — carries no cheikh attribution in
  the source app, so it ships fully live rather than as a placeholder.
- `lib/abjad/soul-connection.ts`, `content/soul-connection-data.json`
  ← `services/compatibility/soulArchetypes.ts` (severity + tags per soul
  number) and the real EN/FR/AR text at `translations.{locale}.compatibility.soul`
  in `constants/translations.ts` — extracted with a script run against the
  actual `translations` export (not hand-transcribed) to avoid copy errors
  across ~200 trilingual strings. French is missing the `relationshipContext`
  tab labels in the source app; those five are supplied fresh here since
  they're trivial UI labels, not attributed content.
- `content/buruj-data.json` (served via `app/api/buruj/[index]`, fetched
  client-side per sign rather than bundled — the full file is ~320KB) ←
  `data/burujData.json` in `zaibaitech/asrar-mobile`, copied verbatim. This
  is the same data `getBurujData()`/`calculateIstikhara()` in
  `services/istikhara/calculations.ts` serves to the "Who Am I" results
  tabs (Personality/Career/Blessed Day/Spiritual Practice/Sadaqah) —
  `services/istikhara/burujProfiles.ts`, which looked like it should hold
  this data, is actually an empty stub; the real content lives in this JSON
  file instead. Two tabs in the source app (Health, Zodiac Stones) pull
  from two *other* data files (`constants/zodiacHealthData.ts`,
  `constants/zodiacStones.ts`/`enhancedStoneData.ts`) not yet ported here —
  a reasonable next addition, kept out of this pass to bound scope.

## ⚠️ Important discrepancy found (spec §1, §8.6)

The spec asks whether Asrariya's existing Sadaqah/dignity content — sourced
from **Cheikh Mahdiyou Niane** — is the same person as this app's cheikh.
Inspecting `asrar-mobile/data/zodiacSadaqahData.ts` confirms every entry is
explicitly `authorizedBy: 'Cheikh Mahdiyou Niane'`.

This repo is named for **Cherno Moussa Yero Sy** — a different name, and
**that Sadaqah content specifically (`zodiacSadaqahData.ts`) is still not
reused here.**

Per instruction, Istikhara's result content (§0's follow-up) now ports
`data/burujData.json` instead — see above. That file carries **no
`authorizedBy` field or scholar name anywhere** (verified: no "Cheikh",
"Niane", or similar string in the raw JSON), unlike `zodiacSadaqahData.ts`.
So porting it doesn't reuse Mahdiyou Niane's attributed content, but it also
doesn't confirm the content is Cherno Moussa Yero Sy's either — it's
unattributed in the source. It's rendered here with an
`AttributionFooter name="Cherno Moussa Yero Sy"` on the assumption that,
now ported into this app, it should carry this app's identity — **that
attribution is this app's assumption, not sourced from the data.** Confirm
with the cheikh that this is in fact his material (or reword the
attribution) before shipping to production. Calculator content is still
unbuilt — no equivalent existing dataset has surfaced for it yet.

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
7. **Confirm**: is `data/burujData.json` (now powering Istikhara's
   Personality/Career/Blessed Day/Spiritual Practice/Sadaqah content) in
   fact Cherno Moussa Yero Sy's material? It carries no attribution in the
   source app — this app currently attributes it to him by assumption.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run typecheck
```
