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
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { LuFilter, LuSearch } from 'react-icons/lu';
import { useDebouncedCallback } from 'use-debounce';
import { format } from 'date-fns';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import useWaitFor from '@/hooks/use-wait-for';
import { FiltersSchema } from '@/lib/schemas/filters-schema';
import { initialFilters, statusFilters } from '@/lib/data';
import Checkbox from '@/components/ui/custom-checkbox';
import { FlagIcon } from 'lucide-react';

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
      <Filters
        searchParams={searchParams}
        pathname={pathname}
        replace={replace}
      />
    </div>
  );
}

const Filters = ({
  searchParams,
  pathname,
  replace,
}: {
  searchParams: ReadonlyURLSearchParams;
  pathname: string;
  replace: (href: string, options?: NavigateOptions) => void;
}) => {
  const [open, setOpen] = useState(false);

  const _status = searchParams.get('status') as
    | 'pending'
    | 'submitted'
    | undefined;
  const _from = searchParams.get('from');
  const _to = searchParams.get('to');
  const _flag = searchParams.get('flag');

  const methods = useForm({
    defaultValues: {
      status: [_status],
      from: _from ? new Date(_from) : undefined,
      to: _to ? new Date(_to) : undefined,
      flag: _flag === 'true' ? true : undefined,
    },
    resolver: zodResolver(FiltersSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = methods;

  const { isPending, waitFor } = useWaitFor();

  const onSubmit = handleSubmit(async (data) => {
    const queryData = Object.fromEntries(
      Object.entries(data).filter(([, value]) =>
        Array.isArray(value)
          ? !!value?.length && Boolean(value[0])
          : Boolean(value),
      ),
    );

    console.log(status);

    const { from, to } = queryData;

    if (from && to) {
      queryData.from = format(from as Date, 'MM-dd-yyyy');
      queryData.to = format(to as Date, 'MM-dd-yyyy');
    }

    const query = new URLSearchParams(
      queryData as Record<string, string>,
    ).toString();

    await waitFor(() => {
      replace(`${pathname}?${query}`, {
        scroll: false,
      });
    }, 600);

    setOpen(false);
  });

  const [status, from, to] = watch(['status', 'from', 'to']);

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
                <Checkbox
                  key={id}
                  name="status"
                  label={label}
                  Icon={Icon}
                  value={value}
                  className={cn(
                    status?.[0] === id && id === 'pending' && 'pending_form',
                    status?.[0] === id &&
                      id === 'submitted' &&
                      'submitted_form',
                  )}
                  onClick={() => {
                    setValue(
                      'status',
                      status?.[0] === value ? undefined : [value],
                    );
                  }}
                />
              ))}
            </div>

            <h3 className="mb-2 font-medium">Date</h3>
            <div className="clamp-[gap,2.5,4] flex items-stretch justify-between">
              <FormDatePicker
                className="py-2"
                label="From"
                name="from"
                dateFormat="P"
                disabled={(date) => {
                  if (to) {
                    return date > to || date > new Date();
                  } else {
                    return date > new Date();
                  }
                }}
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
                disabled={(date) => {
                  if (from) {
                    return date > new Date() || date < from;
                  } else {
                    return date > new Date();
                  }
                }}
              />
            </div>

            <Checkbox
              name="flag"
              value="true"
              label="Flagged"
              Icon={FlagIcon}
              className="!mt-6 w-fit has-checked:border-red-400 has-checked:bg-red-200 has-checked:text-red-900 [&_svg]:size-4"
            />

            <div className="mt-8 flex items-center justify-between gap-4">
              <Button
                className="relative w-fit font-medium ring-0 hover:bg-none"
                variant="ghost"
                type="button"
                onClick={() => reset(initialFilters)}
              >
                Clear Filters
              </Button>

              <Button
                type="submit"
                className="max-w-28 rounded-lg"
                isLoading={isPending}
              >
                Apply
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
