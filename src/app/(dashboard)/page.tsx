import FormsSubmitted from './_components/forms-submitted';
import FormsInProgress from './_components/forms-in-progress';
import QuickActions from './_components/quick-actions';
import RangeSelect from '@/components/shared/range-select';
import { Button } from '@/components/ui/button';
import { LuUpload } from 'react-icons/lu';
import SearchFilter from './_components/search-filter';

export default function Home() {
  return (
    <div className="grid gap-4">
      <div className="flex w-full flex-col gap-4 xl:flex-row">
        <section className="db_section">
          <div className="flex items-center justify-between gap-6">
            <h2 className="heading">Overview</h2>
            <RangeSelect />
          </div>

          <div className="flex w-full flex-col gap-4 *:w-full sm:flex-row">
            <FormsSubmitted />
            <FormsInProgress />
          </div>
        </section>

        <section className="db_section md:max-w-1/2 xl:max-w-[22.75rem]">
          <h2 className="heading">Quick Actions</h2>
          <QuickActions />
        </section>
      </div>

      <section className="db_section">
        <div className="flex items-center justify-between gap-6">
          <h2 className="heading">Forms Accessed</h2>

          <Button
            className="text-orenda-purple w-fit py-1 text-sm"
            variant="outline"
          >
            <LuUpload /> Export
          </Button>
        </div>

        <SearchFilter />
      </section>
    </div>
  );
}
