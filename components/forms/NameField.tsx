'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { List, Keyboard } from 'lucide-react';
import { ArabicKeyboard } from './ArabicKeyboard';
import { NamePicker } from './NamePicker';

export function NameField({
  label,
  value,
  onChange,
  placeholder,
  showPicker: allowPicker = true,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Hide "Choose from list" — the picker is a person-name database, not relevant for arbitrary text. */
  showPicker?: boolean;
}) {
  const t = useTranslations('nameField');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-300">{label}</span>
        {allowPicker && (
          <button
            type="button"
            onClick={() => setShowPicker(true)}
            className="flex items-center gap-1 text-xs font-medium text-gold underline underline-offset-2"
          >
            <List size={13} aria-hidden />
            {t('chooseFromList')}
          </button>
        )}
      </div>

      <input
        dir="rtl"
        lang="ar"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-xl border border-white/10 bg-navy-card px-3 py-2 text-right text-slate-100 outline-none focus:border-gold"
      />

      <button
        type="button"
        onClick={() => setShowKeyboard((v) => !v)}
        className="flex items-center gap-1.5 self-start text-xs font-medium text-slate-400"
      >
        <Keyboard size={13} aria-hidden />
        {showKeyboard ? t('hideKeyboard') : t('showKeyboard')}
      </button>

      {showKeyboard && (
        <ArabicKeyboard
          onKey={(char) => onChange(value + char)}
          onBackspace={() => onChange(value.slice(0, -1))}
          onSpace={() => onChange(value + ' ')}
        />
      )}

      {showPicker && (
        <NamePicker
          onSelect={(arabic) => {
            onChange(arabic);
            setShowPicker(false);
          }}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  );
}
