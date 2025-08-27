'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { CellContext } from '@tanstack/react-table';
import { CredentialingFormData } from '@/types';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import useFlagForm from '@/hooks/mutations/use-flag-form';
import useSendEmail from '@/hooks/use-send-email';
import PreviewForm from './preview-form';
import { toast } from 'sonner';

const Options = ({ row }: CellContext<CredentialingFormData, unknown>) => {
  const [open, setOpen] = useState(false);
  const [module, setModule] = useState<'download' | 'preview'>();
  const { mutateAsync: sendReminderEmail } = useSendEmail();
  const { id, flag, status, email, name } = row.original;

  const { mutateAsync: flagForm } = useFlagForm();

  const handlePatientRemind = () =>
    toast.promise(
      sendReminderEmail({
        data: { email, first_name: name },
        type: 'reminder',
      }),
      {
        loading: 'Sending reminder...',
        success: () => {
          return 'Reminder sent successfully!';
        },
        error: () => {
          return 'Failed to send reminder. Please try again.';
        },
      },
    );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DialogTrigger asChild>
            <DropdownMenuItem
              onClick={() => setModule('preview')}
              className="py-2 pr-8 text-sm"
            >
              Preview Form
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem
            onClick={() => flagForm(id)}
            className="py-2 pr-8 text-sm"
          >
            {flag ? 'Unflag' : 'Flag'} Form
          </DropdownMenuItem>
          {status === 'pending' && (
            <DropdownMenuItem
              onClick={handlePatientRemind}
              className="py-2 pr-8 text-sm"
            >
              Remind Patient
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* {module === 'download' && (
        <DownloadForm name={name} open={open} forms={[id]} />
      )} */}

      {module === 'preview' && <PreviewForm id={id} status={status} />}
    </Dialog>
  );
};
export default Options;
