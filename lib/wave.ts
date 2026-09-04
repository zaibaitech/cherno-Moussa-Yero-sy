/**
 * Wave payment integration — Phase 1 (spec §5): static "Pay with Wave" link,
 * manual confirmation. Replace with the Checkout API (docs.wave.com/checkout)
 * in Phase 2 once volume justifies automating unlock.
 *
 * TODO(cheikh): confirm whether this becomes a Wave Business merchant
 * account in the cheikh's name (spec §8.4) before shipping to production.
 */
export const WAVE_STATIC_PAY_LINK = 'https://pay.wave.com/m/M_sn_BDetgaRBUs5D/c/sn/';
