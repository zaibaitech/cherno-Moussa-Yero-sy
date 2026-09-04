import type { ReactNode } from 'react';
import { Sparkle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';

export function DashboardCard({
  label,
  content,
  subtitle,
  badge,
}: {
  label: string;
  content: ReactNode;
  subtitle: string;
  badge?: { color: 'green' | 'red' | 'amber'; label: string };
}) {
  return (
    <Card className="flex flex-col gap-2">
      <div className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-slate-500">
        <Sparkle size={11} className="text-gold" aria-hidden />
        {label}
      </div>
      <div className="text-sm font-semibold text-slate-100">{content}</div>
      <p className="text-xs text-slate-400">{subtitle}</p>
      {badge && <StatusBadge color={badge.color} label={badge.label} />}
    </Card>
  );
}
