'use client';

import { cn } from '@/lib/utils';
import { useId } from 'react';
import { useFormContext } from 'react-hook-form';
import FormErrorMessage from './error-message';

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
  const id = useId();

  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const value = watch(name);

  return (
    <div className={cn('w-full', className)}>
      {label ||
        (showCount && (
          <label
            className="label flex items-center justify-between gap-6"
            htmlFor={id}
          >
            {label}

            <span className="mr-2">
              {value.length}/{props.maxLength}
            </span>
          </label>
        ))}

      <textarea
        className={cn(
          'clamp-[text,sm,base] block w-full rounded-lg px-4 py-2.5 outline outline-[#E7E7E7]',
          {
            'outline-error-red': errors?.[name],
          },
        )}
        id={id}
        {...register(name)}
        aria-describedby={id}
        {...props}
        style={{
          minHeight: '3rem',
          scrollbarWidth: 'thin',
          ...props.style,
        }}
      />

      <FormErrorMessage name={name} id={id} />
    </div>
  );
};
export default Textarea;
