import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { ALL_CALCULATION_TYPES, CALCULATION_TYPES, type CalculationType } from '@/components/calculator/calculatorTypes';
import { CalculatorTypeForm } from '@/components/calculator/CalculatorTypeForm';
import { locales } from '@/lib/i18n/config';

export function generateStaticParams() {
  return locales.flatMap((locale) => ALL_CALCULATION_TYPES.map((type) => ({ locale, type })));
}

function isCalculationType(value: string): value is CalculationType {
  return (ALL_CALCULATION_TYPES as string[]).includes(value);
}

export default async function CalculatorTypePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  if (!isCalculationType(type)) notFound();

  const t = await getTranslations('calculator');
  const locale = await getLocale();
  const meta = CALCULATION_TYPES.find((c) => c.type === type)!;
  const Icon = meta.Icon;

  return (
    <div className="flex flex-col gap-4">
      <Link href={`/${locale}/calculator`} className="flex items-center gap-1.5 self-start text-xs font-medium text-slate-400">
        <ArrowLeft size={14} className="rtl:rotate-180" aria-hidden />
        {t('backToCalculators')}
      </Link>

      <div className="flex items-center gap-2.5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
          <Icon size={18} aria-hidden />
        </span>
        <div>
          <h1 className="text-lg font-semibold text-gold">{t(meta.titleKey)}</h1>
          <p className="text-xs text-slate-500">{t(meta.subtitleKey)}</p>
        </div>
      </div>

      <CalculatorTypeForm calcType={type} />
    </div>
  );
}
