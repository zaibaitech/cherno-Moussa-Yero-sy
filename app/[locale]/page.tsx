import { IlmAlNujumGrid } from '@/components/dashboard/IlmAlNujumGrid';
import { ManuscriptMarketplace } from '@/components/dashboard/ManuscriptMarketplace';

export default async function DashboardPage() {
  return (
    <div className="flex flex-col gap-3">
      <IlmAlNujumGrid />
      <ManuscriptMarketplace />
    </div>
  );
}
