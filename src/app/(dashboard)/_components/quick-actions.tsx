'use client';

import { Button } from '@/components/ui/button';
import { LuBell, LuDownload, LuSend } from 'react-icons/lu';
import SendNewForm from './send-new-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import RemindPatient from './remind-patient';
import MassDownload from './mass-download';
import { useState } from 'react';
import { SuccessIcon } from '@/assets/svgs';
import { Status } from '@/types';

const QuickActions = () => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>('default');

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
    {
      id: 'mass-download',
      name: 'Mass download',
      description: 'Download forms between specific dates',
      Icon: LuDownload,
      DialogContent: <MassDownload close={() => setOpen(false)} />,
    },
  ];

  return (
    <>
      <ul className="space-y-3">
        {actions.map((action) => (
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
                  className="border-border flex justify-start text-sm font-normal"
                >
                  <span className="bg-purple-mist flex size-6 flex-shrink-0 items-center justify-center rounded-full *:size-4 *:flex-shrink-0">
                    <action.Icon className="text-orenda-purple" />
                  </span>
                  {action.name}
                </Button>
              </DialogTrigger>
              <DialogContent className="pt-6 pb-[3.38rem]">
                {status === 'default' && (
                  <DialogHeader>
                    <DialogTitle>{action.name}</DialogTitle>
                    {action.description && (
                      <DialogDescription className="text-primary">
                        {action.description}
                      </DialogDescription>
                    )}
                  </DialogHeader>
                )}
                {status === 'success' ? (
                  <div className="mt-6 flex flex-col items-center justify-center gap-6">
                    <SuccessIcon className="text-[#00B809]" />
                    <p className="text-center text-lg font-semibold">
                      {action.successMessage}
                    </p>
                  </div>
                ) : (
                  action.DialogContent
                )}
              </DialogContent>
            </Dialog>
          </li>
        ))}
      </ul>
    </>
  );
};
export default QuickActions;
