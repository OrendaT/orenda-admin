'use client';

import { Button } from '@/components/ui/button';
import { FormDatePicker } from '@/components/ui/date-picker';
import useMassDownload from '@/hooks/mutations/use-mass-download';
import useCheckStatus from '@/hooks/queries/use-check-status';
import useRetry from '@/hooks/use-retry';
import { cn, downloadFileFromUrl } from '@/lib/utils';
import useDownloadFormStore from '@/stores/download-form-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const MassDownloadSchema = z.object({
  from: z.date({ message: 'Start date is required' }),
  to: z.date({ message: 'End date is required' }),
});

const MassDownload = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  // Dialog Functionality
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

  // -------------------
  // Export Functionality
  const [key, setKey] = useState<string>();
  const [taskId, setTaskId] = useState<string>();
  const [loading, setLoading] = useState(false);
  const downloads = useDownloadFormStore((state) => state.downloads);
  const addTask = useDownloadFormStore((state) => state.addTask);
  const updateTask = useDownloadFormStore((state) => state.updateTask);

  const { mutateAsync: massDownload } = useMassDownload();
  const { data, refetch } = useCheckStatus(taskId);

  const onSubmit = handleSubmit(async (data) => {
    const from_date = format(data.from, 'MM-dd-yyyy');
    const to_date = format(data.to, 'MM-dd-yyyy');
    const generatedKey = `${from_date}_${to_date}`;
    setKey(generatedKey);

    if (!downloads[generatedKey]) {
      const res = await massDownload({ from_date, to_date });

      addTask(generatedKey, {
        status: 'pending',
        task_id: res.data?.task_id,
      });

      setTaskId(res.data.task_id);
    } else if (downloads[generatedKey].task_id) {
      setTaskId(downloads[generatedKey].task_id);
    }

    setLoading(true);
    refetch();
  });

  // check the status until its ready
  useRetry({
    callback: refetch,
    delay: 2000,
    retries: Infinity,
    stop: data?.ready || !key || !taskId, // Stop when data is ready or there's no key or task id
  });

  useEffect(() => {
    // if mass download failed
    if (data?.ready && !data.successful) {
      setLoading(false);
      toast.error('Mass download failed');
    }

    // set url if mass download successful
    if (key && data?.url) {
      const { url } = data;

      updateTask(key, {
        url,
        status: 'success',
      });

      // download file when url is returned
      console.log('downloading');
      downloadFileFromUrl({ name: key, url }, () => {
        toast.success('Mass download complete');
        reset();
        setOpen(false);
        setLoading(false);
      });
    }
  }, [data, key, setOpen, reset, updateTask]);

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

          <div className="xs:grid hidden items-center">
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
          isLoading={loading}
          type="submit"
          className="mx-auto max-w-[25rem] rounded-lg"
        >
          {loading ? 'Downloading' : ' Download file'}
        </Button>
      </form>
    </FormProvider>
  );
};
export default MassDownload;
