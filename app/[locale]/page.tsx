import { getTranslations } from 'next-intl/server';
import { ComingSoonCard } from '@/components/dashboard/ComingSoonCard';
import { QuickStartRow } from '@/components/dashboard/QuickStartRow';

export default async function DashboardPage() {
  const t = await getTranslations('dashboard');

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold text-gold">{t('title')}</h1>

      <ComingSoonCard title={t('rulingPlanet')} message={t('comingSoon')} />
      <ComingSoonCard title={t('nextPrayer')} message={t('comingSoon')} />
      <ComingSoonCard title={t('planetaryHour')} message={t('comingSoon')} />
      <ComingSoonCard title={t('tomorrow')} message={t('comingSoon')} />

      <section>
        <h2 className="mb-2 text-sm font-medium text-slate-300">{t('quickStart')}</h2>
        <QuickStartRow />
      </section>
    </div>
  );
}
