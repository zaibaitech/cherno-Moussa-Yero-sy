import { getTranslations } from 'next-intl/server';
import { Card } from '@/components/ui/Card';
import { Hourglass } from 'lucide-react';

export default async function CalculatorPage() {
  const t = await getTranslations('calculator');

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold text-gold">{t('title')}</h1>
      <Card className="flex flex-col items-center gap-3 py-10 text-center">
        <Hourglass size={28} className="text-slate-500" aria-hidden />
        <p className="text-sm text-slate-400">{t('comingSoon')}</p>
      </Card>
    </div>
  );
}
