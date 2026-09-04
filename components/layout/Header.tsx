import { getLocale, getTranslations } from 'next-intl/server';
import { Settings } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SearchBar } from './SearchBar';

// Intl's own part ordering (weekday/month/day vs. weekday/day/month) is kept
// as-is per locale — only the era abbreviation is patched: Node's ICU data
// has no French Hijri era string, so `fr-u-ca-islamic-umalqura` silently
// renders the English "AH" instead of a French one.
const HIJRI_ERA: Record<string, string> = { fr: 'H.' };

function hijriDate(locale: string): string | null {
  try {
    const formatter = new Intl.DateTimeFormat(`${locale}-u-ca-islamic-umalqura`, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    });
    return formatter
      .formatToParts(new Date())
      .map((part) => (part.type === 'era' ? (HIJRI_ERA[locale] ?? part.value) : part.value))
      .join('');
  } catch {
    return null;
  }
}

export async function Header() {
  const locale = await getLocale();
  const t = await getTranslations('app');
  const hijri = hijriDate(locale);

  return (
    <header className="flex flex-col gap-3 border-b border-white/5 px-4 pb-4 pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/40 text-sm font-semibold text-gold">
            D
          </span>
          <span className="text-sm font-medium tracking-wide text-gold">{t('name')}</span>
        </div>
        <LanguageSwitcher />
      </div>

      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-wide text-gold">{t('name')}</h1>
          {hijri && <p className="text-xs text-slate-400">{hijri}</p>}
        </div>
        <div className="flex items-center gap-2">
          <SearchBar />
          <button
            type="button"
            aria-label="Settings"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-slate-400"
          >
            <Settings size={18} aria-hidden />
          </button>
        </div>
      </div>
    </header>
  );
}
