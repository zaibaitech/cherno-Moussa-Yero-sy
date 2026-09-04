import { IlmAlNujumGrid } from '@/components/dashboard/IlmAlNujumGrid';
import { ManuscriptMarketplace } from '@/components/dashboard/ManuscriptMarketplace';
import { QuickActionsBar } from '@/components/dashboard/QuickActionsBar';

export default async function DashboardPage() {
  return (
    <div className="flex h-full min-h-full flex-col justify-between gap-2">
      <IlmAlNujumGrid />
      <ManuscriptMarketplace />
      <QuickActionsBar />
    </div>
  );
}
