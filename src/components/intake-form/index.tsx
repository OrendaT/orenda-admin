import FormsSubmitted from '../../components/intake-form/_components/forms-submitted';
import FormsInProgress from '../../components/intake-form/_components/forms-in-progress';
import QuickActions from '../../components/intake-form/_components/quick-actions';
import RangeSelect from '@/components/shared/range-select';
import SearchFilter from '../../components/intake-form/_components/search-filter';
import IntakeFormTable from './_components/intake-form-table';
import Export from './_components/export';
import { Suspense } from 'react';

const IntakeForm = async () => {
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

      <section className="db_section overflow-x-auto">
        <div className="mb-7 flex items-center justify-between gap-6">
          <h2 className="heading mb-0">Forms Accessed</h2>

          <Export />
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <SearchFilter />
        </Suspense>

        <IntakeFormTable />
      </section>
    </div>
  );
};

export default IntakeForm;
