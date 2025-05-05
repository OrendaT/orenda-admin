import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import DownloadForm from './download-form';
import { CellContext } from '@tanstack/react-table';
import { IntakeFormTableData } from '@/types';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import useFlagForm from '@/hooks/mutations/use-flag-form';

const Options = ({ row }: CellContext<IntakeFormTableData, unknown>) => {
  const [open, setOpen] = useState(false);
  const name = String(row.getValue('name'));
  const { id } = row.original;

  const { mutateAsync: flagForm, isPending } = useFlagForm();

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
          <DropdownMenuItem className="py-2 pr-8 text-sm">
            Preview Form
          </DropdownMenuItem>
          <DialogTrigger asChild>
            <DropdownMenuItem className="py-2 pr-8 text-sm">
              Download Form
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            onClick={() => flagForm(id)}
            disabled={isPending}
            className="py-2 pr-8 text-sm"
          >
            Flag Form
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DownloadForm name={name} open={open} />
    </Dialog>
  );
};
export default Options;
