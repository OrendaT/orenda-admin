'use client';

import { FormCheckIcon } from '@/assets/svgs';
import StatsCard from '@/components/shared/stats-card';
import StatsCardSkeleton from '@/components/skeletons/stats-card-skeleton';
import { useAllForms } from '@/hooks/queries/use-all-forms';
import { DashboardCardStats } from '@/types';

const FormsSubmitted = ({ className }: { className?: string }) => {
  const { data, isPending } = useAllForms();

  const stats: DashboardCardStats = {
    name: 'Forms Submitted',
    value: data?.total ?? 0,
    percentage: 10.5,
    trend: 'down',
    range: 'Last month',
    NameIcon: FormCheckIcon,
  };

  if (isPending) return <StatsCardSkeleton />;

  return <StatsCard className={className} stats={stats} />;
};
export default FormsSubmitted;
