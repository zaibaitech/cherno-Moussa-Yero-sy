import { Search } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

/**
 * Visual only for now — no search index exists yet (books catalog and
 * calculators are still placeholders). Wire this up once there's real
 * content to search across.
 */
export async function SearchBar() {
  const t = await getTranslations('dashboard');

  return (
    <div className="flex flex-1 items-center gap-2 rounded-full border border-white/10 bg-navy-card px-3 py-2 text-sm text-slate-400">
      <Search size={16} aria-hidden />
      <span>{t('search')}</span>
    </div>
  );
}
