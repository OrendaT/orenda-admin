import { cn } from '@/lib/utils';
import { BaseFormData } from '@/types';
import { CellContext } from '@tanstack/react-table';

const FormColStatus = <T extends BaseFormData = BaseFormData>({
  getValue,
}: CellContext<T, unknown>) => {
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
};
export default FormColStatus;
