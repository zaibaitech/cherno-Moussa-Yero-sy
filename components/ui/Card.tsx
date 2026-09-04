import type { ReactNode } from 'react';

export function Card({
  children,
  className = '',
  padding = 'p-4',
}: {
  children: ReactNode;
  className?: string;
  padding?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/5 bg-navy-card ${padding} shadow-lg shadow-black/20 ${className}`}
    >
      {children}
    </div>
  );
}
