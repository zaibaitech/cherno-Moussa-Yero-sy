import { getTranslations } from 'next-intl/server';
import { IstikharaForm } from '@/components/istikhara/IstikharaForm';

export default async function IstikharaPage() {
  const t = await getTranslations('istikhara');

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-semibold text-gold">{t('title')}</h1>
        <p className="text-sm text-slate-400">{t('subtitle')}</p>
      </div>
      <IstikharaForm />
    </div>
  );
}
