import { IntakeFormData } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { MdOutlineFlag } from 'react-icons/md';
import Options from './options';
import DownloadButton from './options/download-button';
import {
  SelectCell,
  SelectHeader,
} from '@/components/shared/forms-select-checkbox';

export const columns: ColumnDef<IntakeFormData>[] = [
  {
    id: 'select',
    header: SelectHeader,
    cell: SelectCell,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'fullname',
    header: 'Provider Name',
    cell: ({ getValue, row }) => {
      const value = String(getValue());
      const isFlagged = row.original.flag;

      return (
        <div className="flex items-center gap-2">
          {isFlagged && (
            <MdOutlineFlag className="size-[1.1rem] text-[#D90101]" />
          )}
          {value}
        </div>
      );
    },
  },
  {
    accessorKey: 'type',
    header: 'Form Type',
    cell: 'Credentialing Form',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const value = String(getValue());
      return (
        <span
          className={cn(
            'clamp-[px,2.5,4] clamp-[py,1,0.38rem] block w-fit rounded-3xl text-xs capitalize',
            {
              pending_form: value === 'pending',
              submitted_form: value === 'submitted',
            },
          )}
        >
          {value}
        </span>
      );
    },
  },
  {
    accessorKey: 'updated_at',
    header: 'Status Date',
    cell: ({ getValue }) => {
      let value = getValue();
      const dateValue = new Date(value as string);
      value = dateValue
        ? format(dateValue, 'PPp').replace('PM', 'pm').replace('AM', 'am')
        : value;
      return value;
    },
  },
  {
    accessorKey: 'last_accessed_at',
    header: 'Last Accessed',
    cell: ({ getValue }) => {
      let value = getValue();

      if (!value) return '—';

      const dateValue = new Date(value as string);
      value = dateValue
        ? format(dateValue, 'PPp').replace('PM', 'pm').replace('AM', 'am')
        : value;
      return value;
    },
  },
  {
    id: 'download',
    enableHiding: false,
    cell: DownloadButton,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: Options,
  },
];
