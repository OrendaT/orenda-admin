import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { IntakeFormTableData } from '@/types';
import { Table } from '@tanstack/react-table';

export function IntakeFormTablePagination({
  className,
  table,
}: {
  className?: string;
  table: Table<IntakeFormTableData>;
}) {
  const currentPageIndex = table.getState().pagination.pageIndex;
  const items = [currentPageIndex, currentPageIndex + 1, currentPageIndex + 2];

  return (
    <Pagination className={cn(className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={!table.getCanPreviousPage()}
            href={`page=${currentPageIndex - 1}`}
          />
        </PaginationItem>
        {items.map((item) => {
          const pageNumber = item + 1;
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href={`?page=${pageNumber}`}
                aria-current="page"
                className="active"
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            aria-disabled={!table.getCanNextPage()}
            href={`page=${currentPageIndex + 1}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
