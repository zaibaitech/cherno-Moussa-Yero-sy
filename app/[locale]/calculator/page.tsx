import { getTranslations } from 'next-intl/server';
import { CalculatorTypeBrowser } from '@/components/calculator/CalculationTypeSelector';

export default async function CalculatorPage() {
  const t = await getTranslations('calculator');

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-semibold text-gold">{t('title')}</h1>
        <p className="text-sm text-slate-400">{t('subtitle')}</p>
      </div>
      <CalculatorTypeBrowser />
    </div>
  );
}
