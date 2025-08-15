import { format } from 'date-fns';
import { BaseFormData } from '@/types';
import { CellContext } from '@tanstack/react-table';

const FormColStatusDate = <T extends BaseFormData = BaseFormData>({
  getValue,
}: CellContext<T, unknown>) => {
  let value = getValue();
  const dateValue = new Date(value as string);
  value = dateValue
    ? format(dateValue, 'PPp').replace('PM', 'pm').replace('AM', 'am')
    : value;
  return value;
};
export default FormColStatusDate;
