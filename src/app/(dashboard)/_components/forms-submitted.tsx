import { FormCheckIcon } from '@/assets/svgs';
import StatsCard from '@/components/shared/stats-card';
import { DashboardCardStats } from '@/types';

const FormsSubmitted = ({ className }: { className?: string }) => {
  const stats: DashboardCardStats = {
    name: 'Forms Submitted',
    value: 500,
    percentage: 10.5,
    trend: 'down',
    range: 'Last month',
    NameIcon: FormCheckIcon,
  };

  return <StatsCard className={className} stats={stats} />;
};
export default FormsSubmitted;
