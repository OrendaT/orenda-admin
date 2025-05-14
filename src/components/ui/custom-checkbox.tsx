import { cn } from '@/lib/utils';
import { ComponentType, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

interface CheckboxProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  name: string;
  className?: string;
  Icon?: ComponentType;
}

const Checkbox = ({
  label,
  name,
  className,
  Icon,
  ...props
}: CheckboxProps) => {
  const { register } = useFormContext();

  return (
    <label
      className={cn(
        'flex cursor-pointer items-center gap-2 rounded-3xl border px-4 py-1.5 text-sm font-medium transition-all duration-300 select-none',
        className,
      )}
    >
      {Icon && <Icon />}
      {label}

      {/* Hidden radio input */}
      <input type="checkbox" hidden {...props} {...register(name)} />
    </label>
  );
};
export default Checkbox;
