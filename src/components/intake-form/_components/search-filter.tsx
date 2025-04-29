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
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { LuCircleCheckBig, LuFilter, LuSearch, LuTimer } from 'react-icons/lu';
import { z } from 'zod';

const FiltersSchema = z.object({
  status: z.enum(['pending', 'submitted']).optional(),
  start_date: z.date({ message: 'From date is required' }),
  end_date: z.date({ message: 'To date is required' }),
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
      <Filters />
    </div>
  );
}

const Filters = () => {
  const [open, setOpen] = useState(false);

  const methods = useForm({
    defaultValues: {
      status: undefined,
      start_date: undefined,
      end_date: undefined,
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
    console.log(data);
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
                    'flex cursor-pointer items-center gap-2 rounded-3xl border px-4 py-2 text-sm font-medium',
                    status === id && id === 'pending' && 'pending_form',
                    status === id && id === 'submitted' && 'submitted_form',
                  )}
                  key={id}
                >
                  <Icon />
                  {label}

                  {/* Hidden radio input */}
                  <input type="radio" value={value} hidden {...register('status')} />
                </label>
              ))}
            </div>

            <h3 className="mb-2 font-medium">Date</h3>
            <div className="clamp-[gap,2.5,4] mb-12 flex items-stretch justify-between">
              <FormDatePicker label="From" name="start_date" dateFormat="P" />

              <div className="grid items-center">
                <hr
                  className={cn('clamp-[w,4,5] mt-7 block border-[#888]', {
                    'mt-0': Object.values(errors ?? {}).length,
                  })}
                />
              </div>

              <FormDatePicker label="To" name="end_date" dateFormat="P" />
            </div>

            <Button type="submit" className="mx-auto max-w-[25rem] rounded-lg">
              Apply
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
