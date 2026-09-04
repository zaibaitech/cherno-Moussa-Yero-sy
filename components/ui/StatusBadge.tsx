const DOT_COLOR: Record<'green' | 'red' | 'amber', string> = {
  green: '#22c55e',
  red: '#ef4444',
  amber: '#f59e0b',
};

export function StatusBadge({ color, label }: { color: 'green' | 'red' | 'amber'; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300">
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: DOT_COLOR[color] }} />
      {label}
    </span>
  );
}
