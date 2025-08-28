import { Suspense } from 'react';
import SearchFilterSkeleton from '@/components/skeletons/search-filter-skeleton';
import FormsTableSkeleton from '@/components/skeletons/forms-table-skeleton';
import QuickActions from '@/components/shared/quick-actions';
import SearchFilter from '@/components/shared/search-filter';
import CCFormsTable from './components/billing-forms-table';

const BillingForms = async () => {
  return (
    <div className="grid gap-4">
      <div className="flex w-full flex-col gap-4 xl:flex-row">
        <section className="db_section">
          <h2 className="heading">Quick Actions</h2>
          <QuickActions
            className="clamp-[gap,2,4] flex w-full *:w-full"
            actionClassName="!clamp-[py,2.5,4] !clamp-[px,2,4] rounded-lg"
          />
        </section>
      </div>

      <section className="db_section overflow-x-auto">
        <div className="mb-7 flex items-center justify-between gap-6">
          <h2 className="heading mb-0">Forms Accessed</h2>
        </div>

        <Suspense fallback={<SearchFilterSkeleton />}>
          <SearchFilter />
        </Suspense>
        <Suspense fallback={<FormsTableSkeleton />}>
          <CCFormsTable />
        </Suspense>
      </section>
    </div>
  );
};

export default BillingForms;
