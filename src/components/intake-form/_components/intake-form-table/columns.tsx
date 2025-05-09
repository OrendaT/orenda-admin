import { IntakeFormTableData } from '@/types';
import { CellContext, ColumnDef, HeaderContext } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { MdOutlineFlag } from 'react-icons/md';
import Options from './options';
import { useSelectedFormsStore } from '@/stores/selected-forms-store';

export const columns: ColumnDef<IntakeFormTableData>[] = [
  {
    id: 'select',
    header: SelectHeader,
    cell: SelectCell,
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
    cell: 'Intake Form',
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

function SelectHeader({ table }: HeaderContext<IntakeFormTableData, unknown>) {
  const forms = useSelectedFormsStore((state) => state.forms);
  const addForm = useSelectedFormsStore((state) => state.addForm);
  const removeForm = useSelectedFormsStore((state) => state.removeForm);

  return (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && 'indeterminate')
      }
      onCheckedChange={(value) => {
        table.toggleAllPageRowsSelected(!!value);
        const rowIds = table
          .getPaginationRowModel()
          .rows.map((row) => row.original.id);
        if (value) {
          rowIds.forEach((id) => {
            if (!forms.length) {
              addForm(id);
            } else if (!forms.includes(id)) {
              {
                addForm(id);
              }
            }
          });
        } else {
          rowIds.forEach(removeForm);
        }
      }}
      aria-label="Select all"
    />
  );
}

function SelectCell({ row }: CellContext<IntakeFormTableData, unknown>) {
  const id = row.original.id;
  const addForm = useSelectedFormsStore((state) => state.addForm);
  const removeForm = useSelectedFormsStore((state) => state.removeForm);

  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => {
        row.toggleSelected(!!value);
        if (value) {
          addForm(id);
        } else {
          removeForm(id);
        }
      }}
      aria-label="Select row"
    />
  );
}
