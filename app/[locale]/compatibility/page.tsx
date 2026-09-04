import { getTranslations } from 'next-intl/server';
import { CompatibilityForm } from '@/components/compatibility/CompatibilityForm';

export default async function CompatibilityPage() {
  const t = await getTranslations('compatibility');

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-semibold text-gold">{t('title')}</h1>
        <p className="text-sm text-slate-400">{t('subtitle')}</p>
      </div>
      <CompatibilityForm />
    </div>
  );
}
