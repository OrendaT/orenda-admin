'use client';

import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  name: string;
  showCount?: boolean;
}

const Textarea = ({
  label,
  name,
  className,
  showCount,
  ...props
}: TextareaProps) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const value = watch(name);

  return (
    <div className={cn('w-full', className)}>
      <label
        className="flex items-center justify-between gap-6 text-sm font-medium"
        htmlFor={name}
      >
        {label}

        <span className="mr-2">
          {value.length}/{props.maxLength}
        </span>
      </label>

      <textarea
        className={cn(
          'clamp-[text,sm,base] block w-full rounded-lg px-4 py-2.5 outline outline-[#E7E7E7]',
          {
            'outline-error-red': errors?.[name],
            'mt-2': label || showCount,
          },
        )}
        id={name}
        {...register(name)}
        {...props}
        style={{
          minHeight: '3rem',
          scrollbarWidth: 'thin',
          ...props.style,
        }}
      />

      {errors[name] && (
        <p className="text-error-red mt-1 text-sm">
          {errors?.[name]?.message as string}
        </p>
      )}
    </div>
  );
};
export default Textarea;
