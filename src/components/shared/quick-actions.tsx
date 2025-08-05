'use client';

import { Button } from '@/components/ui/button';
import { LuBell, LuDownload, LuSend } from 'react-icons/lu';
import SendNewForm from '@/components/shared/send-new-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import RemindPatient from '@/components/shared/remind-patient';
import MassDownload from './mass-download';
import { useState } from 'react';
import { Status } from '@/types';
import SuccessMessage from '@/components/shared/action-success-message';
import { cn } from '@/lib/utils';
import useFormType from '@/hooks/use-form-type';

const QuickActions = ({
  className,
  actionClassName,
}: {
  className?: string;
  actionClassName?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>('default');
  const { type } = useFormType();

  const actions = [
    {
      id: 'send-new-form',
      name: 'Send new form',
      Icon: LuSend,
      DialogContent: <SendNewForm setStatus={setStatus} />,
      successMessage: 'Form link successfully sent',
    },
    {
      id: 'remind-patient',
      name: 'Remind patient',
      Icon: LuBell,
      DialogContent: <RemindPatient setStatus={setStatus} />,
      successMessage: 'Reminder successfully sent',
    },
    type !== 'billing' && {
      id: 'mass-download',
      name: 'Mass download',
      description: 'Download forms between specific dates',
      Icon: LuDownload,
      DialogContent: <MassDownload setOpen={setOpen} />,
    },
  ];

  return (
    <ul className={cn('space-y-3', className)}>
      {actions.map(
        (action) =>
          action && (
            <li key={action.id}>
              <Dialog
                open={action.id === 'mass-download' ? open : undefined}
                onOpenChange={(open) => {
                  if (open) setStatus('default');

                  if (action.id === 'mass-download') setOpen(open);
                }}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'flex justify-start text-sm font-normal',
                      actionClassName,
                    )}
                  >
                    <span className="bg-purple-mist flex size-6 flex-shrink-0 items-center justify-center rounded-full *:size-4 *:flex-shrink-0">
                      <action.Icon className="text-orenda-purple" />
                    </span>
                    {action.name}
                  </Button>
                </DialogTrigger>
                <DialogContent className="pt-6 pb-[3.38rem]">
                  <DialogHeader
                    className={cn(status === 'success' && 'sr-only')}
                  >
                    <DialogTitle>{action.name}</DialogTitle>

                    <DialogDescription
                      className={cn(
                        'text-primary',
                        !action.description && 'sr-only',
                      )}
                    >
                      {action?.description}
                    </DialogDescription>
                  </DialogHeader>

                  {status === 'success' ? (
                    <SuccessMessage message={action.successMessage} />
                  ) : (
                    action.DialogContent
                  )}
                </DialogContent>
              </Dialog>
            </li>
          ),
      )}
    </ul>
  );
};
export default QuickActions;
