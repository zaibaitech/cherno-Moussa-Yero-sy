import { getLocale, getTranslations } from 'next-intl/server';
import { Settings } from 'lucide-react';

function hijriDate(locale: string) {
  try {
    const formatter = new Intl.DateTimeFormat(`${locale}-u-ca-islamic-umalqura`, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    });
    return formatter.format(new Date());
  } catch {
    return null;
  }
}

export async function Header() {
  const locale = await getLocale();
  const t = await getTranslations('app');
  const hijri = hijriDate(locale);

  return (
    <header className="flex flex-col gap-1 border-b border-white/5 px-4 pb-3 pt-5">
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold tracking-wide text-gold">{t('name')}</span>
        <Settings size={20} className="text-slate-400" aria-hidden />
      </div>
      {hijri && <p className="text-xs text-slate-400">{hijri}</p>}
    </header>
  );
}
