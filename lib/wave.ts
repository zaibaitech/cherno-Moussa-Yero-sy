/**
 * Wave payment integration — Phase 1 (spec §5): static "Pay with Wave" link,
 * manual confirmation. Replace with the Checkout API (docs.wave.com/checkout)
 * in Phase 2 once volume justifies automating unlock and there's a full Wave
 * Business account (this static link is a shareable page generated from the
 * Wave app itself, not an API-issued checkout session — it isn't registered
 * for OS-level app deep-linking the way a Checkout API session link is).
 *
 * TODO(cheikh): confirm whether this becomes a Wave Business merchant
 * account in the cheikh's name (spec §8.4) before shipping to production.
 */
export const WAVE_STATIC_PAY_LINK = 'https://pay.wave.com/m/M_sn_BDetgaRBUs5D/c/sn/';

/** Wave's Android app package (play.google.com/store/apps/details?id=com.wave.personal). */
const WAVE_ANDROID_PACKAGE = 'com.wave.personal';

/**
 * Best-effort "open the Wave app directly" link for Android. Wraps the plain
 * https link in an Android intent:// URI, which explicitly tells the OS to
 * launch this exact package and only fall back to the browser (the same
 * https URL) if it isn't installed — a stronger signal than hoping the
 * browser recognizes pay.wave.com as an app-linkable domain on its own.
 *
 * Chromium-based Android browsers (Chrome, and most others, since intent://
 * is an Android/WebView convention rather than a Chrome-only one) honor
 * this; it has no effect on iOS or desktop, where the plain https link is
 * used as-is. This is a best-effort improvement, not a guarantee — actual
 * app deep-linking for a static, non-API link is ultimately Wave's own
 * infrastructure choice.
 */
export function getWaveHref(userAgent: string | null): string {
  if (!userAgent || !/android/i.test(userAgent)) return WAVE_STATIC_PAY_LINK;

  const url = new URL(WAVE_STATIC_PAY_LINK);
  const scheme = url.protocol.replace(':', '');
  const hostAndPath = `${url.host}${url.pathname}${url.search}`;
  const fallback = encodeURIComponent(WAVE_STATIC_PAY_LINK);
  return `intent://${hostAndPath}#Intent;scheme=${scheme};package=${WAVE_ANDROID_PACKAGE};S.browser_fallback_url=${fallback};end`;
}
