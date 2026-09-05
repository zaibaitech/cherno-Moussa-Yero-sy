'use client';

import { useTranslations } from 'next-intl';

// Full 28-letter Arabic alphabet, same set already verified in asrar-mobile's
// keyboard component — reused here rather than re-transcribed from a photo,
// since a couple of the reference screenshot's small glyphs weren't legible
// enough to copy with confidence.
const ROWS: string[][] = [
  ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع'],
  ['ه', 'خ', 'ح', 'ج', 'د', 'ش', 'س'],
  ['ظ', 'ط', 'ذ', 'ز', 'ر', 'و', 'ي'],
  ['ة', 'ى', 'ء', 'ؤ', 'ئ', 'ا', 'ب'],
  ['ن', 'م', 'ك', 'ل', 'ت'],
];

export function ArabicKeyboard({
  onKey,
  onBackspace,
  onSpace,
}: {
  onKey: (char: string) => void;
  onBackspace: () => void;
  onSpace: () => void;
}) {
  const t = useTranslations('nameField');

  return (
    <div dir="rtl" className="flex flex-col gap-1.5 rounded-xl border border-white/10 bg-navy p-2">
      {ROWS.map((row, i) => (
        <div key={i} className="flex justify-center gap-1">
          {row.map((char) => (
            <button
              key={char}
              type="button"
              onClick={() => onKey(char)}
              className="flex h-9 flex-1 items-center justify-center rounded-lg border border-white/10 bg-navy-card text-base font-medium text-slate-100 active:bg-white/10"
            >
              {char}
            </button>
          ))}
        </div>
      ))}
      <div className="flex gap-1.5">
        <button
          type="button"
          onClick={onBackspace}
          className="flex h-9 flex-1 items-center justify-center rounded-lg border border-white/10 bg-red-500/20 text-sm font-medium text-red-300"
        >
          {t('delete')}
        </button>
        <button
          type="button"
          onClick={onSpace}
          className="flex h-9 flex-[2] items-center justify-center rounded-lg border border-white/10 bg-navy-card text-sm font-medium text-slate-300"
        >
          {t('space')}
        </button>
      </div>
    </div>
  );
}
