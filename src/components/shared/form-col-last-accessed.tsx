import { format } from 'date-fns';
import { BaseFormData } from '@/types';
import { CellContext } from '@tanstack/react-table';

const FormColLastAccessed = <T extends BaseFormData = BaseFormData>({
  getValue,
}: CellContext<T, unknown>) => {
  let value = getValue();

  if (!value) return '—';

  const dateValue = new Date(value as string);
  value = dateValue
    ? format(dateValue, 'PPp').replace('PM', 'pm').replace('AM', 'am')
    : value;
  return value;
};
export default FormColLastAccessed;
