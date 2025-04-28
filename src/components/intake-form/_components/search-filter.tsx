'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { LuCheck, LuFilter, LuSearch } from 'react-icons/lu';

const filters = ['By Name', 'By Status', 'By Date'];

const SearchFilter = () => {
  const [filter, setFilter] = useState('');

  const changeFilter = (filter: string) => {
    setFilter((prev) => (prev === filter ? '' : filter));
  };

  return (
    <div className="clamp-[gap,2,0.81rem] flex w-full items-center">
      <div className="relative w-full max-w-60">
        <LuSearch className="absolute bottom-1/2 left-3 size-4 translate-y-1/2 text-[#B0B0B0]" />
        <input
          className="border-input block w-full rounded-lg border py-1.5 ps-8 pe-2 text-sm"
          type="text"
          placeholder="Search"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="w-fit py-1.5 text-sm font-normal"
            variant="outline"
          >
            <LuFilter />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-auto p-0" align="end">
          {filters.map((_filter) => (
            <DropdownMenuItem onClick={() => changeFilter(_filter)} key={_filter}>
              {_filter} {filter === _filter && <LuCheck />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default SearchFilter;
