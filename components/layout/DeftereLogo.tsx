/**
 * Exact logo lockup supplied by the cheikh/team — rendered as inline JSX
 * (not a static <img src="...svg">) so the Cinzel font actually cascades
 * into the SVG <text> element from the page's CSS; an external file
 * reference would silently fall back to the Georgia/serif fallback instead.
 */
export function DeftereLogo({ width = 190 }: { width?: number }) {
  return (
    // direction="ltr" is required, not cosmetic: with no explicit
    // text-anchor, the <text> below inherits `direction` from the RTL page
    // and SVG's text-anchor "start" is direction-relative — in rtl it
    // anchors at x=82 and flows backward (leftward), scrambling the
    // wordmark. The brand name itself should never mirror anyway.
    <svg viewBox="0 0 380 90" width={width} height={(width * 90) / 380} direction="ltr">
      <defs>
        <linearGradient id="deftereGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F3E5AB" />
          <stop offset="30%" stopColor="#D4A276" />
          <stop offset="70%" stopColor="#C58B4E" />
          <stop offset="100%" stopColor="#8A5A2B" />
        </linearGradient>

        <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g transform="translate(10, 10)">
        <g transform="translate(0, 0) scale(0.95)">
          <circle cx="35" cy="35" r="30" fill="none" stroke="url(#deftereGold)" strokeWidth="1.8" filter="url(#goldGlow)" />
          <circle cx="35" cy="35" r="27" fill="none" stroke="url(#deftereGold)" strokeWidth="0.8" strokeDasharray="2, 1.5" />

          <path d="M 32 3 C 32 1.5, 38 1.5, 38 3 C 36.5 4.5, 33.5 4.5, 32 3 Z" fill="url(#deftereGold)" />
          <circle cx="35" cy="1" r="1" fill="url(#deftereGold)" />

          <line x1="35" y1="8" x2="35" y2="62" stroke="url(#deftereGold)" strokeWidth="0.6" opacity="0.6" />
          <line x1="8" y1="35" x2="62" y2="35" stroke="url(#deftereGold)" strokeWidth="0.6" opacity="0.6" />
          <circle cx="35" cy="35" r="18" fill="none" stroke="url(#deftereGold)" strokeWidth="0.8" strokeDasharray="4, 3" />

          <path d="M 20 42 A 16 16 0 0 1 48 24" fill="none" stroke="url(#deftereGold)" strokeWidth="1.2" />
          <path d="M 22 22 A 16 16 0 0 1 50 44" fill="none" stroke="url(#deftereGold)" strokeWidth="0.8" opacity="0.7" />

          <path
            d="M 10 12 L 24 12 C 40 12, 48 22, 48 35 C 48 48, 40 58, 24 58 L 10 58 Z M 17 18 L 17 52 L 23 52 C 34 52, 40 44, 40 35 C 40 26, 34 18, 23 18 Z"
            fill="url(#deftereGold)"
            filter="url(#goldGlow)"
          />

          <path d="M 8 48 C 14 48, 12 36, 18 30 C 14 30, 8 38, 8 48 Z" fill="url(#deftereGold)" />

          <circle cx="28" cy="24" r="1" fill="url(#deftereGold)" />
          <circle cx="42" cy="40" r="1" fill="url(#deftereGold)" />
          <circle cx="38" cy="20" r="0.8" fill="url(#deftereGold)" />
        </g>

        <text
          x="82"
          y="49"
          fill="url(#deftereGold)"
          fontFamily="var(--font-cinzel), 'Cinzel Decorative', 'Cinzel', 'Playfair Display', Georgia, serif"
          fontSize="42"
          fontWeight="500"
          letterSpacing="1.2"
          filter="url(#goldGlow)"
        >
          Deftere
        </text>
      </g>
    </svg>
  );
}
