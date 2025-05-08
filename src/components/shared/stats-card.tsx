import { cn } from '@/lib/utils';
import { DashboardCardStats } from '@/types';
import { formatDistanceToNowStrict } from 'date-fns';
import { LuArrowDown, LuArrowUp } from 'react-icons/lu';

interface StatsCardProps {
  className?: string;
  stats: DashboardCardStats;
}

const StatsCard = ({
  className,
  stats: { NameIcon, ...stats },
}: StatsCardProps) => {
  const TrendIcon = stats.trend === 'up' ? LuArrowUp : LuArrowDown;

  return (
    <article className={cn('card', className)}>
      <h3 className="card_heading">
        <NameIcon /> {stats.name}
      </h3>

      <div className="clamp-[gap,4,8] flex items-center">
        <p className="clamp-[text,5xl,4rem] font-semibold">{stats.value}</p>

        <div className="space-y-1 text-xs">
          <p
            className={cn(
              '[&_svg]:size-[0.85rem flex items-center justify-center gap-1 rounded-lg border px-3 py-1.5 font-medium shadow-xs',
              {
                'border-[#CEFFC9] bg-[#F5FFF4] text-[#008C25]':
                  stats.trend === 'up',
                'border-[#FFC8C8] bg-[#FFF4F4] text-[#D90101]':
                  stats.trend === 'down',
              },
            )}
          >
            <TrendIcon strokeWidth={2.3} />
            {stats.percentage}%
          </p>
          <p className="text-[#8E8E8E]">Last {formatDistanceToNowStrict(stats.range)}</p>
        </div>
      </div>
    </article>
  );
};
export default StatsCard;
