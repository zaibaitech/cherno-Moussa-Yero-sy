import type { ReactNode } from 'react';

export function Card({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/5 bg-navy-card p-4 shadow-lg shadow-black/20 ${className}`}
    >
      {children}
    </div>
  );
}
