/**
 * Recreated from the supplied reference screenshot — no original vector
 * asset (Figma/AI export) was available, only a raster screenshot, so this
 * is a faithful hand-built SVG recreation (ornate "D" + astrolabe medallion
 * with crescent), not a trace of the original file. Swap the <DeftereMark>
 * body for a real exported asset if/when one exists.
 */
function DeftereMark({ size = 40 }: { size?: number }) {
  const ticks = Array.from({ length: 32 }, (_, i) => (i * 360) / 32);

  return (
    <svg width={size} height={size} viewBox="0 0 140 120" fill="none" aria-hidden>
      <defs>
        {/*
          userSpaceOnUse, not the default objectBoundingBox: a vertical tick
          <line> has a zero-width bounding box, which makes an
          objectBoundingBox gradient degenerate and invisible on those ticks
          specifically (circles/paths render fine either way).
        */}
        <linearGradient id="deftereGold" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="140" y2="120">
          <stop offset="0%" stopColor="#F3D08A" />
          <stop offset="50%" stopColor="#D4A276" />
          <stop offset="100%" stopColor="#B4793F" />
        </linearGradient>
      </defs>

      <text
        x="2"
        y="96"
        fontSize="102"
        fontWeight="700"
        fontFamily="var(--font-cinzel), Georgia, serif"
        fill="url(#deftereGold)"
      >
        D
      </text>

      <g transform="translate(96, 56)" stroke="url(#deftereGold)">
        <circle r="32" strokeWidth="2" />
        <circle r="24" strokeWidth="1" opacity="0.8" />
        {ticks.map((angle) => (
          <line key={angle} x1="0" y1="-34" x2="0" y2="-39" strokeWidth="1.2" transform={`rotate(${angle})`} />
        ))}
        {/* crescent */}
        <path
          d="M -6 -40 A 8 8 0 1 0 6 -30 A 6.4 6.4 0 1 1 -6 -40 Z"
          fill="url(#deftereGold)"
          stroke="none"
        />
        {/* small star */}
        <path d="M 12 -38 l 1.4 3 l 3 1.4 l -3 1.4 l -1.4 3 l -1.4 -3 l -3 -1.4 l 3 -1.4 Z" fill="url(#deftereGold)" stroke="none" />
      </g>
    </svg>
  );
}

export function DeftereLogo({ size = 40, wordmark = true }: { size?: number; wordmark?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <DeftereMark size={size} />
      {wordmark && (
        <span className="font-logo text-2xl font-medium tracking-wide" style={{ color: '#D4A276' }}>
          Deftere
        </span>
      )}
    </div>
  );
}
