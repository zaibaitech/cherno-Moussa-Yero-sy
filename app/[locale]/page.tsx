import { getTranslations } from 'next-intl/server';
import { IlmAlNujumGrid } from '@/components/dashboard/IlmAlNujumGrid';
import { ManuscriptMarketplace } from '@/components/dashboard/ManuscriptMarketplace';

export default async function DashboardPage() {
  const t = await getTranslations('dashboard');

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="mb-3 text-lg font-semibold text-gold">{t('title')}</h1>
        <IlmAlNujumGrid />
      </section>

      <ManuscriptMarketplace />
    </div>
  );
}
