import { Suspense } from 'react';
import SearchFilterSkeleton from '../../../components/skeletons/search-filter-skeleton';
import FormsTableSkeleton from '../../../components/skeletons/forms-table-skeleton';
import Export from '../intake-forms/components/export';
import QuickActions from '../intake-forms/components/quick-actions';
import SearchFilter from '../intake-forms/components/search-filter';
import CCFormsTable from './components/cc-forms-table';

const CreditCardForms = async () => {
  return (
    <div className="grid gap-4">
      <div className="flex w-full flex-col gap-4 xl:flex-row">
        <section className="db_section md:max-w-1/2 xl:max-w-[35%]">
          <h2 className="heading">Quick Actions</h2>
          <QuickActions />
        </section>
      </div>

      <section className="db_section overflow-x-auto">
        <div className="mb-7 flex items-center justify-between gap-6">
          <h2 className="heading mb-0">Forms Accessed</h2>

          <Export />
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

export default CreditCardForms;
