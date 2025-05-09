'use client';

import { Button } from '@/components/ui/button';
import { FormDatePicker } from '@/components/ui/date-picker';
import useMassDownload from '@/hooks/mutations/use-mass-download';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const MassDownloadSchema = z.object({
  from: z.date({ message: 'Start date is required' }),
  to: z.date({ message: 'End date is required' }),
});

const MassDownload = ({ close }: { close: () => void }) => {
  const { mutateAsync: massDownload, isPending } = useMassDownload();
  const methods = useForm({
    defaultValues: {
      from: undefined,
      to: undefined,
    },
    resolver: zodResolver(MassDownloadSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = methods;

  const [from, to] = watch(['from', 'to']);

  const onSubmit = handleSubmit(async (data) => {
    const from_date = format(data.from, 'MM-dd-yyyy');
    const to_date = format(data.to, 'MM-dd-yyyy');

    const res = await massDownload({ from_date, to_date });

    console.log(res);

    if (res.status === 200) {
      toast.success(res.data?.message);
      reset();
      close();
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="mt-6" noValidate>
        <div className="clamp-[gap,2.5,4] mb-12 flex items-stretch justify-between">
          <FormDatePicker
            label="Start date"
            name="from"
            dateFormat="PP"
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
              className={cn('clamp-[w,4,6] mt-7 block border-[#888]', {
                'mt-0': Object.values(errors ?? {}).length,
              })}
            />
          </div>

          <FormDatePicker
            label="End date"
            name="to"
            dateFormat="PP"
            disabled={(date) => {
              if (from) {
                return date > new Date() || date < from;
              } else {
                return date > new Date();
              }
            }}
          />
        </div>

        <Button
          isLoading={isPending}
          type="submit"
          className="mx-auto max-w-[25rem] rounded-lg"
        >
          Download file
        </Button>
      </form>
    </FormProvider>
  );
};
export default MassDownload;
