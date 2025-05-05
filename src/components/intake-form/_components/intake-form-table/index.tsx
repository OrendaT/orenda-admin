'use client';

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { columns } from './columns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IntakeFormTablePagination } from './pagination';
import { useAllForms } from '@/hooks/queries/use-all-forms';
import FormSkeleton from './form-skeleton';

const IntakeFormTable = () => {
  const { data, isLoading, isError } = useAllForms();

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: data?.total_pages ?? 0,
    autoResetPageIndex: false,
  });
  return (
    <>
      <Table className="mt-8 mb-3">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="hover:bg-transparent" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isError ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-destructive h-24 text-center"
              >
                Failed to fetch data.
              </TableCell>
            </TableRow>
          ) : isLoading || !data ? (
            // Show skeleton while loading
            <FormSkeleton />
          ) : table.getRowModel().rows?.length > 0 ? (
            // Show actual data rows
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            // Only show "No results" if not loading and no rows
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {table.getPageCount() > 1 && (
        <IntakeFormTablePagination
          className="mb-8 flex justify-end"
          table={table}
        />
      )}
    </>
  );
};
export default IntakeFormTable;
