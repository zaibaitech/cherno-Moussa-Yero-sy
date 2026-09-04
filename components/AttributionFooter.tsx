import { useTranslations } from 'next-intl';

/**
 * Every piece of rendered content sourced from the cheikh must carry this,
 * mirroring the Asrariya Sadaqah attribution pattern (spec §2/§0).
 */
export function AttributionFooter({ name }: { name: string }) {
  const t = useTranslations('attribution');
  return (
    <p className="mt-4 border-t border-white/5 pt-3 text-xs text-slate-400">
      {t('label')}: <span className="text-gold">{name}</span>
    </p>
  );
}
