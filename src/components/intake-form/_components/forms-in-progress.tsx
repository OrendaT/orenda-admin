'use client';

import StatsCard from '@/components/shared/stats-card';
import { getPastDate } from '@/lib/utils';
import { usePreviousDateStore } from '@/stores/previous-date-store';
import { DashboardCardStats } from '@/types';
import { LuDownload } from 'react-icons/lu';

const FormsInProgress = ({ className }: { className?: string }) => {
  const days = usePreviousDateStore((state) => state.days);
  const from = getPastDate(days);

  const stats: DashboardCardStats = {
    name: 'Forms in progress',
    value: 320,
    percentage: 35,
    trend: 'up',
    range: from,
    NameIcon: LuDownload,
  };

  return <StatsCard className={className} stats={stats} />;
};
export default FormsInProgress;
