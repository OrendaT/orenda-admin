'use client';

import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { columns } from './columns';
import { useAllForms } from '@/hooks/queries/use-all-forms';
import useFormsParams from '@/hooks/use-forms-params';
import FormsTable from '@/components/shared/forms-table';
import { CREDENTIALING_FORMS_EP } from '@/lib/api/endpoints';
import { CredentialingFormData } from '@/types';

const CredentialingFormsTable = () => {
  const { page, search, flag, from, to, status } = useFormsParams();

  const { data, isPending, isError } = useAllForms<CredentialingFormData>({
    url: CREDENTIALING_FORMS_EP.ALL_FORMS,
    page,
    search,
    filters: {
      flag,
      from,
      to,
      status,
    },
    prefetchNextPages: true,
  });

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
    manualPagination: true,
    pageCount: data?.total_pages ?? 0,
    autoResetPageIndex: false,
  });
  return (
    <FormsTable
      table={table}
      columns={columns}
      isPending={isPending}
      isError={isError}
    />
  );
};
export default CredentialingFormsTable;
