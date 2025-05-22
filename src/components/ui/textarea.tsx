// components/ui/form-textarea.tsx

'use client';

import { cn } from '@/lib/utils';
import React, { ComponentProps, useId } from 'react';
import { useFormContext } from 'react-hook-form';
import FormErrorMessage from './error-message';

interface FormTextareaProps extends ComponentProps<'textarea'> {
  label?: React.ReactNode;
  name: string;
  textareaClassName?: string;
}

const FormTextarea = ({
  label,
  name,
  className,
  textareaClassName,
  ...props
}: FormTextareaProps) => {
  const id = useId();

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="label" htmlFor={id}>
          {label}
        </label>
      )}

      <textarea
        className={cn(
          'w-full rounded-lg px-4 py-2.5 outline outline-[#E7E7E7] text-sm resize-none',
          {
            'outline-error-red': errors?.[name],
          },
          textareaClassName,
        )}
        id={id}
        {...register(name)}
        aria-describedby={id}
        {...props}
      />

      <FormErrorMessage name={name} id={id} />
    </div>
  );
};

export default FormTextarea;