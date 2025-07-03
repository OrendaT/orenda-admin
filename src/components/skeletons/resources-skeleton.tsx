import { Skeleton } from '../ui/skeleton';

const ResourcesSkeleton = () => {
  return (
    <div className="px-1 sm:px-0">
      <Skeleton className="clamp-[h,6,7] mb-8 w-48 bg-zinc-300" />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(12.5rem,1fr))] justify-items-center gap-5 pb-12">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="h-52 w-full bg-zinc-300" />
        ))}
      </div>
    </div>
  );
};
export default ResourcesSkeleton;
