import useDownloadForm from '@/hooks/mutations/use-download-form';
import { FormData } from '@/types';
import { CellContext } from '@tanstack/react-table';
import { LuDownload } from 'react-icons/lu';
import { toast } from 'sonner';
import { downloadFile } from '@/lib/utils';

const DownloadButton = ({ row }: CellContext<FormData, unknown>) => {
  const { id, first_name, last_name, status } = row.original;

  const { mutateAsync: downloadForm } = useDownloadForm();

  const handleDownloadForm = async () => {
    const promise = downloadForm(id);
    toast.promise(promise, {
      loading: 'Downloading...',
      success: ({ data: file }) => {
        const name = `${first_name} ${last_name}`;
        downloadFile({ name, file });
        return {
          message: 'Form downloaded successfully',
          description: name,
        };
      },
      error: 'Error downloading form',
    });
  };

  return (
    status === 'submitted' && (
      <button type="button" title="Download" onClick={handleDownloadForm}>
        <LuDownload className="size-4" />
      </button>
    )
  );
};
export default DownloadButton;
