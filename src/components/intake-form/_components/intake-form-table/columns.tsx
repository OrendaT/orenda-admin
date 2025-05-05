import { IntakeFormTableData } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { MdOutlineFlag } from 'react-icons/md';
import Options from './options';

export const columns: ColumnDef<IntakeFormTableData>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'name',
    accessorFn: ({ first_name, last_name }) => `${first_name} ${last_name}`,
    header: 'Patient Name',
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
    cell: 'Intake Form'
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
    accessorKey: 'date',
    header: 'Status Date',
    cell: ({ getValue }) => {
      let value = getValue();
      value = value instanceof Date ? format(value, 'Ppaa') : value;
      return value;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: Options,
  },
];
