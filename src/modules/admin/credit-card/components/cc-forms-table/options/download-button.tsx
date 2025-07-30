'use client';

import useDownloadForm from '@/hooks/mutations/use-download-form';
import { CreditCardFormData } from '@/types';
import { CellContext } from '@tanstack/react-table';
import { LuDownload } from 'react-icons/lu';
import { toast } from 'sonner';
import { downloadFile } from '@/lib/utils';

const DownloadButton = ({ row }: CellContext<CreditCardFormData, unknown>) => {
  const { id, patient_name: name, status } = row.original;

  const { isPending, mutateAsync: downloadForm } = useDownloadForm();

  const handleDownloadForm = async () => {
    const promise = downloadForm(id);
    toast.promise(promise, {
      loading: 'Downloading...',
      success: ({ data: file }) => {
        downloadFile({ name, file });
        return {
          message: 'Form downloaded successfully',
          description: <span className="text-black">{name}</span>,
          icon: null,
        };
      },
      error: 'Error downloading form',
    });
  };

  return (
    status === 'submitted' && (
      <button
        disabled={isPending}
        type="button"
        title="Download"
        onClick={handleDownloadForm}
      >
        <LuDownload className="size-4" />
      </button>
    )
  );
};
export default DownloadButton;
