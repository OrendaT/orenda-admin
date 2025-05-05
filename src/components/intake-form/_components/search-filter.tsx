'use client';

import { Button } from '@/components/ui/button';
import { FormDatePicker } from '@/components/ui/date-picker';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { LuCircleCheckBig, LuFilter, LuSearch, LuTimer } from 'react-icons/lu';
import { z } from 'zod';
import { useDebouncedCallback } from 'use-debounce';

const FiltersSchema = z.object({
  status: z.enum(['pending', 'submitted']).optional().nullable(),
  from: z.date({ message: 'From date is required' }).optional(),
  to: z.date({ message: 'To date is required' }).optional(),
  flag: z
    .string()
    .optional()
    .or(
      z
        .boolean()
        .default(false)
        .transform(() => ''),
    ),
});

const statusFilters = [
  {
    id: 'pending',
    label: 'Pending',
    value: 'pending',
    Icon: LuTimer,
  },
  {
    id: 'submitted',
    label: 'Submitted',
    value: 'submitted',
    Icon: LuCircleCheckBig,
  },
];

export default function SearchFilter() {
  const { replace } = useRouter(); // replace to set the query params
  const pathname = usePathname();
  const searchParams = useSearchParams(); // get current searchParams

  const createQueryString = useCallback(
    (key: string, query: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!query) {
        params.delete(key);
      } else {
        params.delete('page');
        params.set(key, query);
      }
      console.log(params, params.toString());
      return params.toString();
    },
    [searchParams],
  );

  const updateSearchParam = (key: string, query: string) => {
    replace(`${pathname}?${createQueryString(key, query)}`, {
      scroll: false,
    });
  };

  const debouncedUpdate = useDebouncedCallback(updateSearchParam);

  return (
    <div className="clamp-[gap,2,0.81rem] flex w-full items-center">
      <div className="relative w-full max-w-60">
        <LuSearch className="absolute bottom-1/2 left-3 size-4 translate-y-1/2 text-[#B0B0B0]" />
        <input
          className="border-input block w-full rounded-lg border py-1.5 ps-8 pe-2 text-sm"
          type="text"
          placeholder="Search"
          name="search"
          onChange={(e) => {
            const { name, value } = e.target;
            debouncedUpdate(name, value);
          }}
          defaultValue={searchParams.get('search')?.toString() || ''}
        />
      </div>
      <Filters updateSearchParam={updateSearchParam} />
    </div>
  );
}

const Filters = ({
  updateSearchParam,
}: {
  updateSearchParam: (key: string, value: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  const methods = useForm({
    defaultValues: {
      status: undefined,
      from: undefined,
      to: undefined,
      flag: '',
    },
    resolver: zodResolver(FiltersSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = methods;

  const status = watch('status');

  const onSubmit = handleSubmit((data) => {
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof Date) {
        value = value.toISOString().split('T')[0];
      }

      updateSearchParam(key, value ?? '');
    });
    setOpen(false);
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit py-1.5 text-sm font-normal" variant="outline">
          <LuFilter />
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
          <DialogDescription>
            Find what you need by setting filters!
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...methods}>
          <form className="mt-2 space-y-4" onSubmit={onSubmit} noValidate>
            <h3 className="mb-2 font-medium">Status</h3>
            <div className="flex items-center gap-4">
              {statusFilters.map(({ id, label, value, Icon }) => (
                <label
                  className={cn(
                    'flex cursor-pointer items-center gap-2 rounded-3xl border px-4 py-1.5 text-sm font-medium',
                    status === id && id === 'pending' && 'pending_form',
                    status === id && id === 'submitted' && 'submitted_form',
                  )}
                  key={id}
                >
                  <Icon />
                  {label}

                  {/* Hidden radio input */}
                  <input
                    type="radio"
                    value={value}
                    hidden
                    {...register('status')}
                  />
                </label>
              ))}
            </div>

            <h3 className="mb-2 font-medium">Date</h3>
            <div className="clamp-[gap,2.5,4] flex items-stretch justify-between">
              <FormDatePicker
                className="py-2"
                label="From"
                name="from"
                dateFormat="P"
              />

              <div className="grid items-center">
                <hr
                  className={cn('clamp-[w,4,5] mt-7 block border-[#888]', {
                    'mt-0': errors.from || errors.to,
                  })}
                />
              </div>

              <FormDatePicker
                className="py-2"
                label="To"
                name="to"
                dateFormat="P"
              />
            </div>

            <label
              className={cn(
                '!mt-6 flex w-fit cursor-pointer items-center gap-2 rounded-3xl border px-4 py-2 text-sm font-medium select-none has-checked:border-red-400 has-checked:bg-red-200 has-checked:text-red-900',
              )}
            >
              Flagged
              {/* Hidden radio input */}
              <input
                type="checkbox"
                value="flag"
                hidden
                {...register('flag')}
              />
            </label>

            <Button
              type="submit"
              className="mx-auto mt-12 max-w-[25rem] rounded-lg"
            >
              Apply
            </Button>

            <p>{JSON.stringify(errors)}</p>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
