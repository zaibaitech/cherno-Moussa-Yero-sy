import { Lock } from 'lucide-react';
import { Card } from '@/components/ui/Card';

/**
 * Placeholder for the ruling-planet / planetary-hour / dignity cards until
 * this app is wired up to the Asrar ephemeris API (spec §6). That API
 * (supabase/functions/ephemeris) returns raw planetary positions but not
 * yet the ruling-planet/dignity layer built on top of it in asrar-mobile —
 * confirm with the backend whether that logic gets exposed too, or gets
 * ported here (spec §0).
 */
export function ComingSoonCard({ title, message }: { title: string; message: string }) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-200">{title}</h3>
        <Lock size={16} className="text-slate-500" aria-hidden />
      </div>
      <p className="mt-2 text-xs text-slate-400">{message}</p>
    </Card>
  );
}
