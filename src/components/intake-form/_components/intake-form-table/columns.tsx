import { IntakeFormTableData } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MdOutlineFlag } from 'react-icons/md';

const actions = [
  {
    name: 'Preview Form',
  },
  {
    name: 'Download Form',
  },
  {
    name: 'Flag Form',
  },
];

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
    accessorKey: 'name',
    header: 'Patient Name',
    cell: ({ getValue, row }) => {
      const value = String(getValue());
      const isFlagged = row.original.flagged;

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
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const value = String(getValue());
      return (
        <span
          className={cn(
            'block w-fit rounded-3xl clamp-[px,2.5,4] clamp-[py,1,0.38rem] text-xs capitalize',
            {
              'bg-[#FFE9A4] text-[#5C4600]': value === 'pending',
              'bg-[#CFFFC9] text-[#0A5E00]': value === 'submitted',
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
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {actions.map(({ name }) => (
              <DropdownMenuItem className="py-2 pr-8 text-sm" key={name}>
                {name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
