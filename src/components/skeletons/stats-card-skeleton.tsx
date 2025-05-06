import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface StatsCardSkeletonProps {
  className?: string;
}

const StatsCardSkeleton = ({ className }: StatsCardSkeletonProps) => {
  return (
    <article className={cn('card', className)}>
      <h3 className="card_heading flex items-center gap-2">
        <Skeleton className="size-5 rounded-full" />
        <Skeleton className="h-5 w-1/2 rounded-md" />
      </h3>

      <div className="clamp-[gap,4,8] flex items-center">
        <Skeleton className="h-20 w-26 rounded-md" />

        <div className="space-y-1 text-xs">
          <Skeleton className="h-6 w-20 rounded-lg" />
          <Skeleton className="h-3 w-16 rounded-sm" />
        </div>
      </div>
    </article>
  );
};

export default StatsCardSkeleton;
