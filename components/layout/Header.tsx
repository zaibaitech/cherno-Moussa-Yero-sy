import { getLocale } from 'next-intl/server';
import { Settings } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SearchBar } from './SearchBar';
import { DeftereLogo } from './DeftereLogo';
import { HeaderTitle } from './HeaderTitle';

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
  const hijri = hijriDate(locale);

  return (
    <header className="flex flex-col gap-1.5 border-b border-white/5 px-4 pb-2 pt-2">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          {/* pl-9 lines up with the "Deftere" text start inside the logo SVG (icon + gap), not the icon itself */}
          <span className="pl-9 text-[9px] font-medium uppercase tracking-[0.2em] text-gold/60">Moussa</span>
          <DeftereLogo width={150} />
        </div>
        <LanguageSwitcher />
      </div>

      <div className="flex items-center justify-between gap-3">
        <HeaderTitle hijri={hijri} />
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
