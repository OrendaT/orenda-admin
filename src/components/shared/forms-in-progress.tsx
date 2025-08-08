'use client';

import StatsCard from '@/components/shared/stats-card';
import StatsCardSkeleton from '@/components/skeletons/stats-card-skeleton';
import { useAllForms } from '@/hooks/queries/use-all-forms';
import { getPastDate } from '@/lib/utils';
import { usePreviousDateStore } from '@/stores/previous-date-store';
import { DashboardCardStat, IntakeFormData } from '@/types';
import { LuDownload } from 'react-icons/lu';
import useFormEP from '@/hooks/use-form-ep';

const FormsInProgress = ({ className }: { className?: string }) => {
  const days = usePreviousDateStore((state) => state.days);
  const from = getPastDate(days);
  const to = getPastDate();

  const { ALL_FORMS } = useFormEP();

  const { data, isPending } = useAllForms<IntakeFormData>({
    url: ALL_FORMS,
    filters: { from, to, status: 'pending' },
  });

  const stats: DashboardCardStat = {
    name: 'Forms in progress',
    value: data?.total ?? 0,
    percentage: 35,
    trend: 'up',
    range: from,
    NameIcon: LuDownload,
  };

  if (isPending)
    return <StatsCardSkeleton name={stats.name} Icon={stats.NameIcon} />;

  return <StatsCard className={className} stats={stats} />;
};
export default FormsInProgress;
