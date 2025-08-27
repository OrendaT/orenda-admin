import { BaseFormData } from '@/types';
import { CellContext } from '@tanstack/react-table';
import { MdOutlineFlag } from 'react-icons/md';

const FormColName = <T extends BaseFormData = BaseFormData>({
  getValue,
  row,
}: CellContext<T, unknown>) => {
  const value = String(getValue());
  const isFlagged = row.original.flag;

  return (
    <div className="flex items-center gap-2">
      {isFlagged && <MdOutlineFlag className="size-[1.1rem] text-[#D90101]" />}
      {value}
    </div>
  );
};
export default FormColName;
