'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationButton,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { type Table } from '@tanstack/react-table';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export default function TablePagination<T = unknown>({
  className,
  table,
}: {
  className?: string;
  table: Table<T>;
}) {
  const { replace } = useRouter(); // replace to set the query params
  const pathname = usePathname();
  const searchParams = useSearchParams(); // get current searchParams

  const currentPageIndex = Number(searchParams.get('page') ?? 1) - 1;

  const createQueryString = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (page <= 1) {
        params.delete('page');
      } else {
        params.set('page', page.toString());
      }

      return params.toString();
    },
    [searchParams],
  );

  const updateSearchParam = (page: number) => {
    replace(`${pathname}?${createQueryString(page)}`, {
      scroll: false,
    });
  };

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
      table.getPageCount() > 2
        ? Math.min(Math.max(previousPageIndex, 0), lastPageIndex - 2)
        : undefined, // Ensure the index is within bounds
      Math.min(Math.max(currentPageIndex, 1), lastPageIndex - 1), // Ensure the index is within bounds
      table.getPageCount() > 1
        ? Math.min(Math.max(nextPageIndex, 2), lastPageIndex)
        : undefined, // Ensure the index is within bounds
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageIndex, table, searchParams]);

  return (
    <Pagination className={cn(className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={currentPageIndex <= 0}
            onClick={() => {
              table.setPageIndex(currentPageIndex - 1);
              updateSearchParam(currentPageIndex);
            }}
            className="text-orenda-purple disabled:text-[#8E8E8E]"
          />
        </PaginationItem>
        {indices.map((index) => {
          return (
            index !== undefined && (
              <PaginationItem key={index}>
                <PaginationButton
                  aria-current="page"
                  isActive={currentPageIndex === index}
                  onClick={() => {
                    table.setPageIndex(index);
                    updateSearchParam(index + 1);
                  }}
                >
                  {index + 1}
                </PaginationButton>
              </PaginationItem>
            )
          );
        })}
        <PaginationItem>
          <PaginationNext
            disabled={table.getPageCount() === currentPageIndex + 1}
            onClick={() => {
              table.setPageIndex(currentPageIndex + 1);
              updateSearchParam(currentPageIndex + 2);
            }}
            className="text-orenda-purple disabled:text-[#8E8E8E]"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
