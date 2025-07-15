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
import { IntakeFormData } from '@/types';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import useFlagForm from '@/hooks/mutations/use-flag-form';
import PreviewForm from './preview-form';
import { toast } from 'sonner';
import { sendReminderEmail } from '@/services/email-service';

const Options = ({ row }: CellContext<IntakeFormData, unknown>) => {
  const [open, setOpen] = useState(false);
  const [module, setModule] = useState<'download' | 'preview'>();
  const { id, flag, status, email, first_name } = row.original;
  const url = 'https://orenda-intake.vercel.app/';

  const { mutateAsync: flagForm } = useFlagForm();

  const handlePatientRemind = () =>
    toast.promise(sendReminderEmail({ email, first_name, url }), {
      loading: 'Sending reminder...',
      success: () => {
        return 'Reminder sent successfully!';
      },
      error: () => {
        return 'Failed to send reminder. Please try again.';
      },
    });

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
