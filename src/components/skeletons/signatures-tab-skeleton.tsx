import { Skeleton } from '../ui/skeleton';

const SignaturesTabSkeleton = () => {
  return (
    <div className="space-y-6">
      <section>
        <Skeleton className="h-5" />
        <ul className="list-decimal space-y-1 ps-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton className="h-5 w-full" key={index} />
          ))}
        </ul>
      </section>

      <section>
        <Skeleton className="mb-2 h-5 w-32" />
        <Skeleton className="h-40 w-full" />
      </section>
    </div>
  );
};
export default SignaturesTabSkeleton;
