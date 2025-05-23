import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { DashboardCardStat } from '@/types';

interface StatsCardSkeletonProps {
  name: string;
  Icon: DashboardCardStat['NameIcon'];
  className?: string;
}

const StatsCardSkeleton = ({
  name,
  Icon,
  className,
}: StatsCardSkeletonProps) => {
  return (
    <article className={cn('card', className)}>
      <h3 className="card_heading">
        <Icon /> {name}
      </h3>

      <div className="clamp-[gap,4,8] flex items-center">
        <Skeleton className="h-20 w-26" />

        <div className="space-y-1 text-xs">
          <Skeleton className="hidden h-6 w-20 rounded-lg" />
          <Skeleton className="h-4 w-16 rounded-sm" />
          <Skeleton className="h-4 w-16 rounded-sm" />
        </div>
      </div>
    </article>
  );
};

export default StatsCardSkeleton;
