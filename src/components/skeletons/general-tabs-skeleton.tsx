import { Skeleton } from '../ui/skeleton';

const GeneralTabsSkeleton = () => {
  return (
    <div>
      <div className="mb-4 flex w-full flex-col items-center gap-2 *:w-full sm:flex-row">
        <div className="space-y-2">
          <Skeleton className="h-4 w-2/3 max-w-32" />
          <Skeleton className="h-4 w-[95%]" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-2/3 max-w-32" />
          <Skeleton className="h-4 w-[95%]" />
        </div>
      </div>

      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="mb-4 space-y-2">
          <Skeleton className="h-4 w-2/3 max-w-32" />
          <Skeleton className="h-4 w-[95%]" />
        </div>
      ))}
    </div>
  );
};
export default GeneralTabsSkeleton;
