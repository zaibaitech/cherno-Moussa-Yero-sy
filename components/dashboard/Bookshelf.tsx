/**
 * Decorative bookshelf strip under the marketplace row — a wood plank with
 * a row of book spines standing on it. No real illustration asset exists,
 * so this is generated SVG (fixed, hand-authored spine data — not
 * Math.random() at render time, which would risk a server/client
 * hydration mismatch).
 */
const SPINES: { color: string; h: number; w: number }[] = [
  { color: '#7f1d1d', h: 44, w: 10 }, { color: '#166534', h: 50, w: 8 },
  { color: '#78350f', h: 38, w: 12 }, { color: '#1e3a5f', h: 46, w: 9 },
  { color: '#581c37', h: 40, w: 11 }, { color: '#134e4a', h: 48, w: 8 },
  { color: '#92400e', h: 36, w: 10 }, { color: '#3f3f1e', h: 44, w: 9 },
  { color: '#7c2d12', h: 50, w: 12 }, { color: '#1e293b', h: 38, w: 8 },
  { color: '#854d0e', h: 46, w: 10 }, { color: '#7f1d1d', h: 40, w: 9 },
  { color: '#166534', h: 44, w: 11 }, { color: '#4c1d95', h: 48, w: 8 },
  { color: '#78350f', h: 36, w: 10 }, { color: '#1e3a5f', h: 50, w: 9 },
  { color: '#581c37', h: 42, w: 12 }, { color: '#134e4a', h: 46, w: 8 },
  { color: '#92400e', h: 38, w: 10 }, { color: '#7c2d12', h: 44, w: 9 },
  { color: '#1e293b', h: 48, w: 11 }, { color: '#854d0e', h: 40, w: 8 },
  { color: '#166534', h: 46, w: 10 }, { color: '#7f1d1d', h: 36, w: 9 },
  { color: '#1e3a5f', h: 50, w: 10 }, { color: '#78350f', h: 42, w: 8 },
];

const SHELF_Y = 56; // baseline the spines sit on
const GAP = 1.5;

export function Bookshelf() {
  let x = 0;
  const spineEls = SPINES.map((s, i) => {
    const rectX = x;
    x += s.w + GAP;
    const y = SHELF_Y - s.h;
    return (
      <g key={i}>
        <rect x={rectX} y={y} width={s.w} height={s.h} rx={0.6} fill={s.color} />
        <rect x={rectX} y={y} width={s.w} height={1.3} fill="#e2c778" opacity={0.55} />
        <rect x={rectX} y={SHELF_Y - 4} width={s.w} height={1} fill="#e2c778" opacity={0.4} />
        <rect x={rectX} y={y} width={0.8} height={s.h} fill="#000" opacity={0.15} />
      </g>
    );
  });
  const totalWidth = x;

  return (
    <svg
      viewBox={`0 0 ${totalWidth} 66`}
      preserveAspectRatio="none"
      className="h-14 w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="shelfWood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7a4a24" />
          <stop offset="45%" stopColor="#5b3a1e" />
          <stop offset="100%" stopColor="#3d2712" />
        </linearGradient>
      </defs>

      {/* books standing on the shelf */}
      {spineEls}

      {/* the shelf plank itself, drawn over the spine bottoms for a clean edge */}
      <rect x={0} y={SHELF_Y} width={totalWidth} height={10} fill="url(#shelfWood)" />
      <rect x={0} y={SHELF_Y} width={totalWidth} height={1.2} fill="#e2c778" opacity={0.5} />
      <rect x={0} y={SHELF_Y + 9.2} width={totalWidth} height={0.8} fill="#000" opacity={0.4} />
    </svg>
  );
}
