'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  flexRender,
  type Table as TTable,
  type ColumnDef,
} from '@tanstack/react-table';
import TablePagination from '@/components/shared/table-pagination';
import FormSkeleton from '@/components/skeletons/forms-skeleton';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FormsTableProps<T = unknown> {
  table: TTable<T>;
  columns: ColumnDef<T>[];
  isPending: boolean;
  isError: boolean;
  className?: string;
}

export default function FormsTable<T>({
  table,
  columns,
  isError,
  isPending,
  className,
}: FormsTableProps<T>) {
  return (
    <>
      <Table className={cn('mt-8 mb-3', className)}>
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
                <Button
                  variant="ghost"
                  className="mx-auto mt-2 w-fit py-1.5 text-sm"
                  type="button"
                  onClick={() => location.reload()}
                >
                  Retry
                </Button>
              </TableCell>
            </TableRow>
          ) : isPending ? (
            // Show skeleton while loading
            <FormSkeleton length={columns.length} />
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
      <Suspense fallback={<div>Loading...</div>}>
        {table.getPageCount() > 1 && (
          <TablePagination className="mb-8 flex justify-end" table={table} />
        )}
      </Suspense>
    </>
  );
}
