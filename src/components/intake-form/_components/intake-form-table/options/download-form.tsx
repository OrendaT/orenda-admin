'use client';

import SuccessMessage from '@/components/shared/action-success-message';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Input from '@/components/ui/input';
import useExport from '@/hooks/mutations/use-export';
import { useClipboard } from '@/hooks/use-clipboard';
import { cn } from '@/lib/utils';
import { Status } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { LuPencil } from 'react-icons/lu';
import { toast } from 'sonner';
import { z } from 'zod';

const DownloadFormSchema = z.object({
  name: z.string().min(1, { message: 'This field is required' }),
});

const url = 'www.google.com';

const DownloadForm = ({
  name = '',
  open,
  forms,
}: {
  name?: string;
  open: boolean;
  forms: string[];
}) => {
  const [allowEdit, setAllowEdit] = useState(!name);
  const [status, setStatus] = useState<Status>('default');
  const [copied, onClick] = useClipboard(url);
  const { mutateAsync: _export, isPending } = useExport();
  const { status: authStatus } = useSession();

  const methods = useForm({
    defaultValues: { name },
    resolver: zodResolver(DownloadFormSchema),
  });

  const { handleSubmit, setFocus } = methods;

  const handleEditName = () => {
    setAllowEdit(true);
    setFocus('name');
  };

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    setStatus('success');
  });

  useEffect(() => {
    const exportForm = async () => {
      try {
        console.log(forms);
        const res = await _export({ patients: forms });
        console.log(res);
      } catch (error) {
        console.error(error);
        if (!forms.length) {
          toast.error('No forms selected');
        }
      }
    };

    if (!open) {
      setStatus('default');
    } else {
      setAllowEdit(!name);
      if (authStatus === 'authenticated') exportForm();
    }
  }, [open, _export, authStatus, forms, name]);

  return (
    <DialogContent className="pb-12">
      <DialogHeader className={cn(status === 'success' && 'sr-only')}>
        <DialogTitle>Export</DialogTitle>
      </DialogHeader>

      {status === 'success' ? (
        <SuccessMessage message="File successfully exported" />
      ) : (
        <FormProvider {...methods}>
          <form className="mt-4 space-y-8" noValidate onSubmit={onSubmit}>
            <Input
              label="Document Name"
              name="name"
              suffix={
                !allowEdit && (
                  <LuPencil
                    title="Edit name"
                    className="size-4 cursor-pointer"
                    onClick={handleEditName}
                  />
                )
              }
              readOnly={!allowEdit}
              inputClassName="text-sm py-3"
              tabIndex={!!name ? -1 : 0}
            />

            <div>
              <h3 className="label">Export Options</h3>
              <p className="text-sm">Files are exported as zip files</p>
            </div>
            <div className="mt-12 flex items-center justify-between gap-4">
              <Button
                disabled={!url || isPending}
                className="relative w-fit ring-0 hover:bg-none"
                onClick={onClick}
                variant="ghost"
                type="button"
              >
                Copy URL
                {copied && (
                  <span className="absolute -top-4 right-1/2 translate-x-1/2 text-xs font-normal">
                    copied!
                  </span>
                )}
              </Button>

              <Button
                isLoading={isPending}
                type="submit"
                className="max-w-[9.81rem] rounded-lg sm:ml-auto"
              >
                Export
              </Button>
            </div>
          </form>
        </FormProvider>
      )}
    </DialogContent>
  );
};
export default DownloadForm;
