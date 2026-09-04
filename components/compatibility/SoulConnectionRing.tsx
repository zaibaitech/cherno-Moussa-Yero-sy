/**
 * 9-bead ring for the Soul Connection (mod-9) result, ported from
 * asrar-mobile's react-native-svg component to plain SVG for the web.
 */
export function SoulConnectionRing({
  value,
  size = 140,
  activeColor = '#c9a24b',
  inactiveColor = 'rgba(201, 162, 75, 0.2)',
  ofNineLabel = 'OF NINE',
}: {
  value: number;
  size?: number;
  activeColor?: string;
  inactiveColor?: string;
  ofNineLabel?: string;
}) {
  const beadCount = 9;
  const beadRadius = size / 20;
  const ringRadius = size / 2 - beadRadius - 5;
  const centerX = size / 2;
  const centerY = size / 2;

  const beads = Array.from({ length: beadCount }, (_, i) => {
    const angle = ((i * 360) / beadCount - 90) * (Math.PI / 180);
    const x = centerX + ringRadius * Math.cos(angle);
    const y = centerY + ringRadius * Math.sin(angle);
    return { x, y, isActive: i + 1 === value, number: i + 1 };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={centerX} cy={centerY} r={ringRadius} fill="none" stroke="rgba(148,163,184,0.15)" strokeDasharray="2 4" />
      {beads.map((bead) => (
        <circle
          key={bead.number}
          cx={bead.x}
          cy={bead.y}
          r={bead.isActive ? beadRadius * 1.2 : beadRadius}
          fill={bead.isActive ? activeColor : inactiveColor}
          stroke={bead.isActive ? activeColor : 'transparent'}
          strokeWidth={bead.isActive ? 2 : 0}
        />
      ))}
      <text
        x={centerX}
        y={centerY - 4}
        textAnchor="middle"
        fontSize={size * 0.32}
        fontWeight={700}
        fill={activeColor}
      >
        {value}
      </text>
      <text
        x={centerX}
        y={centerY + size * 0.14}
        textAnchor="middle"
        fontSize={size * 0.08}
        letterSpacing={2}
        fill="#94a3b8"
      >
        {ofNineLabel}
      </text>
    </svg>
  );
}
