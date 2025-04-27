'use client';

import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const MassDownloadSchema = z.object({
  start_date: z.string().date(),
  end_date: z.string().date(),
});

const MassDownload = ({ close }: { close: () => void }) => {
  const methods = useForm({
    defaultValues: {
      start_date: '',
      end_date: '',
    },
    resolver: zodResolver(MassDownloadSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    close();
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="mt-8" noValidate>
        <Button type="submit" className="mx-auto max-w-[25rem] rounded-lg">
          Download file
        </Button>
      </form>
    </FormProvider>
  );
};
export default MassDownload;
