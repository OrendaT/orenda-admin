'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  name: string;
}

const Input = ({ label, name, type, className, ...props }: InputProps) => {
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
      <label className="block text-sm font-medium" htmlFor={name}>
        {label}
      </label>

      <div
        className={cn('relative', {
          'mt-2': label,
        })}
      >
        <input
          className={cn(
            'clamp-[text,sm,base] py-2.5 block w-full rounded-lg px-4 outline outline-[#E7E7E7]',
            {
              'outline-error-red': errors?.[name],
              'pe-11': type === 'password',
            },
          )}
          id={name}
          type={currentType}
          {...register(name)}
          {...props}
        />

        {type === 'password' && (
          <span
            onClick={() => togglePassword()}
            className={cn(
              'absolute top-0 right-4 h-full cursor-pointer content-center text-[#8E8E8E] *:clamp-[size,5,6]',
              {
                'text-error-red': errors?.[name],
              },
            )}
          >
            {currentType === 'password' ? <FiEyeOff /> : <FiEye />}
          </span>
        )}
      </div>

      {errors[name] && (
        <p className="text-error-red mt-1 text-sm">
          {errors?.[name]?.message as string}
        </p>
      )}
    </div>
  );
};
export default Input;
