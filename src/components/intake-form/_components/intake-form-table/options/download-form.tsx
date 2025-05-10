'use client';

import SuccessMessage from '@/components/shared/action-success-message';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Input from '@/components/ui/input';
import useExport from '@/hooks/mutations/use-export';
import useCheckStatus from '@/hooks/queries/use-check-status';
import { useClipboard } from '@/hooks/use-clipboard';
import { cn, downloadFile } from '@/lib/utils';
import useDownloadFormStore from '@/stores/download-form-store';
import { Status } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { LuPencil } from 'react-icons/lu';
import { z } from 'zod';

const DownloadFormSchema = z.object({
  name: z.string().min(1, { message: 'This field is required' }),
});

const DownloadForm = ({
  name = '',
  open,
  forms,
}: {
  name?: string;
  open: boolean;
  forms: string[];
}) => {
  // Dialog Functionality
  const [allowEdit, setAllowEdit] = useState(!name);
  const [status, setStatus] = useState<Status>('default');

  const methods = useForm({
    defaultValues: { name },
    resolver: zodResolver(DownloadFormSchema),
  });

  const { handleSubmit, setFocus } = methods;

  const handleEditName = () => {
    setAllowEdit(true);
    setFocus('name');
  };

  // reset dialog state to default
  // reset input allow edit state
  useEffect(() => {
    if (!open) {
      setStatus('default');
    } else {
      setAllowEdit(!name);
    }
  }, [open, name]);

  // -------------------
  // Export Functionality
  const { mutateAsync: _export } = useExport();
  const key =
    forms.length > 1 ? `${forms[0]}_${forms[forms.length - 1]}` : forms[0];
  const downloads = useDownloadFormStore((state) => state.downloads);
  const addTask = useDownloadFormStore((state) => state.addTask);
  const updateTask = useDownloadFormStore((state) => state.updateTask);

  const { data } = useCheckStatus(downloads[key]?.task_id);

  // copy url function
  const [copied, onClick] = useClipboard(data?.url || '');

  // effect to add task if it doesn't exist
  useEffect(() => {
    const exportForms = async () => {
      const res = await _export({ patients: forms });
      if (res.status === 200) {
        addTask(key, {
          status: 'pending',
          task_id: res.data?.task_id,
        });
      }
    };

    if (open && !downloads[key]) {
      exportForms();
    }
  }, [open, _export, forms, name, addTask, downloads, key]);

  // set url if export successful
  useEffect(() => {
    if (data?.url) {
      updateTask(key, {
        status: 'success',
        url: data.url,
      });
    }
  }, [data, updateTask, key]);

  // Final download
  const onSubmit = handleSubmit((data) => {
    const { name } = data;
    const { url } = downloads[key];
    if (url) {
      downloadFile({ name, url }, () => {
        setStatus('success');
      });
    }
  });

  return (
    <DialogContent className="pb-12">
      <DialogHeader className={cn(status === 'success' && 'sr-only')}>
        <DialogTitle>Export</DialogTitle>
        <DialogDescription className="sr-only">Export form</DialogDescription>
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
                disabled={Boolean(!data?.url)}
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
                isLoading={Boolean(!data?.url)}
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
