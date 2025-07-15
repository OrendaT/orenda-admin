import { CellContext, HeaderContext } from '@tanstack/react-table';
import { useSelectedFormsStore } from '@/stores/selected-forms-store';
import { Checkbox } from '@/components/ui/checkbox';

interface BaseRow {
  id: string;
}

export function SelectHeader<T extends BaseRow = BaseRow>({
  table,
}: HeaderContext<T, unknown>) {
  const _forms = useSelectedFormsStore((state) => state.forms);
  const addForm = useSelectedFormsStore((state) => state.addForm);
  const removeForm = useSelectedFormsStore((state) => state.removeForm);

  const form = 'intake';
  const forms = _forms[form];

  return (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && 'indeterminate')
      }
      onCheckedChange={(value) => {
        // check all rows in current page
        table.toggleAllPageRowsSelected(!!value);

        // get rowIds for all rows in current page
        const rowIds = table
          .getPaginationRowModel()
          .rows.map((row) => row.original.id);

        // add or remove id form selected forms state
        if (value) {
          rowIds.forEach((id) => {
            if (!forms.length) {
              addForm({ form, id });
            } else if (!forms.includes(id)) {
              addForm({ form, id });
            }
          });
        } else {
          rowIds.forEach((id) => removeForm({ form, id }));
        }
      }}
      aria-label="Select all"
    />
  );
}

export function SelectCell<T extends BaseRow = BaseRow>({
  row,
}: CellContext<T, unknown>) {
  const { id } = row.original;
  const addForm = useSelectedFormsStore((state) => state.addForm);
  const removeForm = useSelectedFormsStore((state) => state.removeForm);

  const form = 'intake';

  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => {
        row.toggleSelected(!!value);
        if (value) {
          addForm({ form, id });
        } else {
          removeForm({ form, id });
        }
      }}
      aria-label="Select row"
    />
  );
}
