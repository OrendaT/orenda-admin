<<<<<<<< HEAD:src/modules/admin/intake-forms/index.tsx
import FormsSubmitted from './components/forms-submitted';
import FormsInProgress from './components/forms-in-progress';
import QuickActions from './components/quick-actions';
import RangeSelect from '@/components/shared/range-select';
import SearchFilter from './components/search-filter';
import IntakeFormsTable from './components/intake-forms-table';
import Export from './components/export';
import { Suspense } from 'react';
import SearchFilterSkeleton from '../../../components/skeletons/search-filter-skeleton';
import FormsTableSkeleton from '../../../components/skeletons/forms-table-skeleton';
========
import FormsSubmitted from '@/components/shared/forms-submitted';
import FormsInProgress from '@/components/shared/forms-in-progress';
import QuickActions from '@/components/shared/quick-actions';
import RangeSelect from '@/components/shared/range-select';
import SearchFilter from '@/components/shared/search-filter';
import IntakeFormsTable from './components/intake-forms-table';
import Export from '@/components/shared/export';
import { Suspense } from 'react';
import SearchFilterSkeleton from '@/components/skeletons/search-filter-skeleton';
import FormsTableSkeleton from '@/components/skeletons/forms-table-skeleton';
>>>>>>>> origin/develop:src/modules/admin/intake/index.tsx

const IntakeForms = async () => {
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
          <IntakeFormsTable />
        </Suspense>
      </section>
    </div>
  );
};

export default IntakeForms;
