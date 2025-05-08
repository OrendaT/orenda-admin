'use client';

import { FormCheckIcon } from '@/assets/svgs';
import StatsCard from '@/components/shared/stats-card';
import StatsCardSkeleton from '@/components/skeletons/stats-card-skeleton';
import { useAllForms } from '@/hooks/queries/use-all-forms';
import { getPastDate } from '@/lib/utils';
import { usePreviousDateStore } from '@/stores/previous-date-store';
import { DashboardCardStats } from '@/types';

const FormsSubmitted = ({ className }: { className?: string }) => {
  const days = usePreviousDateStore((state) => state.days);

  const from = getPastDate(days);
  const to = getPastDate();

  const { data, isPending } = useAllForms({ filters: { from, to } });

  const stats: DashboardCardStats = {
    name: 'Forms Submitted',
    value: data?.total ?? 0,
    percentage: 10.5,
    trend: 'down',
    range: from,
    NameIcon: FormCheckIcon,
  };

  if (isPending)
    return <StatsCardSkeleton name={stats.name} Icon={stats.NameIcon} />;

  return <StatsCard className={className} stats={stats} />;
};
export default FormsSubmitted;
