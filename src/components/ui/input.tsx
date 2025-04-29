'use client';

import { cn } from '@/lib/utils';
import { ComponentProps, useId, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import FormErrorMessage from './error-message';

interface InputProps extends Omit<ComponentProps<'input'>, 'prefix'> {
  label?: React.ReactNode;
  name: string;
  afterEl?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  inputClassName?: string;
}

const Input = ({
  label,
  name,
  type,
  className,
  inputClassName,
  prefix,
  suffix,
  afterEl,
  ...props
}: InputProps) => {
  const id = useId();

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [currentType, setCurrentType] = useState(type);
  const togglePassword = () => {
    setCurrentType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="label" htmlFor={id}>
          {label}
        </label>
      )}

      <div className={cn('relative flex w-full')}>
        {/* prefix */}
        {prefix && (
          <span
            className={cn(
              'absolute top-0 left-4 h-full content-center text-[#8E8E8E]',
              {
                'text-error-red': errors?.[name],
              },
            )}
          >
            {prefix}
          </span>
        )}

        {/* input element */}
        <input
          className={cn(
            'clamp-[text,sm,base] w-full rounded-lg px-4 py-2.5 outline outline-[#E7E7E7]',
            {
              'outline-error-red': errors?.[name],
              'ps-11': prefix,
              'pe-11': suffix || type === 'password',
              'rounded-r-none': afterEl,
            },
            inputClassName,
          )}
          id={id}
          type={currentType}
          {...register(name)}
          aria-describedby={id}
          {...props}
        />

        {/* suffix */}
        {(suffix || type === 'password') && (
          <span
            className={cn(
              'absolute top-0 right-4 h-full content-center text-[#8E8E8E]',
              {
                'text-error-red': errors?.[name],
              },
            )}
          >
            {type === 'password' ? (
              <button
                className="*:clamp-[size,5,6] block"
                type="button"
                onClick={togglePassword}
              >
                {currentType === 'password' ? <FiEyeOff /> : <FiEye />}
              </button>
            ) : (
              suffix
            )}
          </span>
        )}

        {afterEl && (
          <div className="clamp-[my,-0.8px,-1px] border-input bg-lavender-mist flex w-[2.94rem] items-center justify-center rounded-r-lg border border-l-0">
            {afterEl}
          </div>
        )}
      </div>

      <FormErrorMessage name={name} id={id} />
    </div>
  );
};
export default Input;
