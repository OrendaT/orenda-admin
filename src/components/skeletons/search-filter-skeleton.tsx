import { Button } from '@/components/ui/button';
import { LuFilter, LuSearch } from 'react-icons/lu';

export default function SearchFilterSkeleton() {
  return (
    <div className="clamp-[gap,2,0.81rem] flex w-full items-center">
      <div className="relative w-full max-w-60">
        <LuSearch className="absolute bottom-1/2 left-3 size-4 translate-y-1/2 text-[#B0B0B0]" />
        <input
          className="border-input block w-full rounded-lg border py-1.5 ps-8 pe-2 text-sm"
          type="text"
          placeholder="Search"
          name="search"
        />
      </div>

      <Button className="w-fit py-1.5 text-sm font-normal" variant="outline">
        <LuFilter />
        Filter
      </Button>
    </div>
  );
}
