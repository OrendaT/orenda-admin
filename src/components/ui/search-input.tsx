// components/ui/search-input.tsx

'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, prefix, suffix, ...props }, ref) => {
    return (
      <div className="relative flex w-full">
        {/* prefix */}
        {prefix && (
          <span className="absolute top-0 left-4 h-full content-center text-[#8E8E8E] z-10">
            {prefix}
          </span>
        )}

        {/* input element */}
        <input
          className={cn(
            'w-full rounded-lg px-4 py-2.5 outline outline-[#E7E7E7] text-sm',
            {
              'ps-11': prefix,
              'pe-11': suffix,
            },
            className,
          )}
          ref={ref}
          {...props}
        />

        {/* suffix */}
        {suffix && (
          <span className="absolute top-0 right-4 h-full content-center text-[#8E8E8E]">
            {suffix}
          </span>
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;