import StatsCard from '@/components/shared/stats-card';
import { DashboardCardStats } from '@/types';
import { LuDownload } from 'react-icons/lu';

const FormsInProgress = ({ className }: { className?: string }) => {
  const stats: DashboardCardStats = {
    name: 'Forms in progress',
    value: 320,
    percentage: 35,
    trend: 'up',
    range: 'Last month',
    NameIcon: LuDownload,
  };

  return <StatsCard className={className} stats={stats} />;
};
export default FormsInProgress;
