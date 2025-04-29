'use client';

import { Button } from '@/components/ui/button';
import { FormDatePicker } from '@/components/ui/date-picker';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const MassDownloadSchema = z.object({
  start_date: z.date({ message: 'Start date is required' }),
  end_date: z.date({ message: 'End date is required' }),
});

const MassDownload = ({ close }: { close: () => void }) => {
  const methods = useForm({
    defaultValues: {
      start_date: undefined,
      end_date: undefined,
    },
    resolver: zodResolver(MassDownloadSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    close();
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="mt-6" noValidate>
        <div className="clamp-[gap,2.5,4] mb-12 flex items-stretch justify-between">
          <FormDatePicker
            label="Start date"
            name="start_date"
            dateFormat="PP"
          />

          <div className="grid items-center">
            <hr
              className={cn('clamp-[w,4,6] mt-7 block border-[#888]', {
                'mt-0': Object.values(errors ?? {}).length,
              })}
            />
          </div>

          <FormDatePicker label="End date" name="end_date" dateFormat="PP" />
        </div>

        <Button type="submit" className="mx-auto max-w-[25rem] rounded-lg">
          Download file
        </Button>
      </form>
    </FormProvider>
  );
};
export default MassDownload;
