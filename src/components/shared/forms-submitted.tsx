'use client';

import { FormCheckIcon } from '@/assets/svgs';
import StatsCard from '@/components/shared/stats-card';
import StatsCardSkeleton from '@/components/skeletons/stats-card-skeleton';
import { useAllForms } from '@/hooks/queries/use-all-forms';
import { getPastDate } from '@/lib/utils';
import { usePreviousDateStore } from '@/stores/previous-date-store';
import { DashboardCardStat, IntakeFormData } from '@/types';
import useFormEP from '@/hooks/use-form-ep';

const FormsSubmitted = ({ className }: { className?: string }) => {
  const days = usePreviousDateStore((state) => state.days);

  const from = getPastDate(days);
  const to = getPastDate();

  const { ALL_FORMS } = useFormEP();

  const { data, isPending } = useAllForms<IntakeFormData>({
    url: ALL_FORMS,
    filters: { from, to, status: 'submitted' },
  });

  const stats: DashboardCardStat = {
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
