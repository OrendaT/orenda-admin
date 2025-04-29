import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationButton,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { IntakeFormTableData } from '@/types';
import { Table } from '@tanstack/react-table';
import { useMemo } from 'react';

export function IntakeFormTablePagination({
  className,
  table,
}: {
  className?: string;
  table: Table<IntakeFormTableData>;
}) {
  const currentPageIndex = table.getState().pagination.pageIndex;

  const indices = useMemo(() => {
    /**
     * Bounds:
     * indices[0]: 0 <= index <= lastPageIndex - 2
     * indices[1]: 1 <= index <= lastPageIndex - 1
     * indices[2]: 2 <= index <= lastPageIndex
     */

    const previousPageIndex = currentPageIndex - 1;
    const nextPageIndex = currentPageIndex + 1;
    const lastPageIndex = table.getPageCount() - 1;

    return [
      Math.min(Math.max(previousPageIndex, 0), lastPageIndex - 2), // Ensure the index is within bounds
      Math.min(Math.max(currentPageIndex, 1), lastPageIndex - 1), // Ensure the index is within bounds
      Math.min(Math.max(nextPageIndex, 2), lastPageIndex), // Ensure the index is within bounds
    ];
  }, [currentPageIndex, table.getPageCount()]);

  return (
    <Pagination className={cn(className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.setPageIndex(currentPageIndex - 1)}
            className="text-orenda-purple disabled:text-[#8E8E8E]"
          />
        </PaginationItem>
        {indices.map((index) => {
          return (
            <PaginationItem key={index}>
              <PaginationButton
                aria-current="page"
                isActive={currentPageIndex === index}
                onClick={() => table.setPageIndex(index)}
              >
                {index + 1}
              </PaginationButton>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            disabled={!table.getCanNextPage()}
            onClick={() => table.setPageIndex(currentPageIndex + 1)}
            className="text-orenda-purple disabled:text-[#8E8E8E]"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
