import { Cinzel } from 'next/font/google';

/**
 * Luxury serif for the "Deftere" wordmark, matching the supplied logo
 * reference. Loaded via next/font (self-hosted at build time, no runtime
 * request to fonts.googleapis.com) rather than a CSS @import.
 */
export const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
});
