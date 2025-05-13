'use client';

import ResetSuccess from '@/components/auth/reset-success';
import Input from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { bothCasesPattern, numAndSpecialPattern } from '@/lib/regex';
import {
  NewPasswordSchema,
  NewPasswordSchemaType,
} from '@/lib/schemas/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import api from '@/lib/api/axios';
import { AUTH_EP } from '@/lib/api/endpoints';
import { AxiosError } from 'axios';

enum PasswordRequirements {
  MIN_LENGTH = 'minLength',
  BOTH_CASES = 'bothCases',
  SPECIAL_CHARS = 'specialChars',
}

const requirements = [
  {
    text: 'A minimum length, typically 8 to 12 characters.',
    type: PasswordRequirements.MIN_LENGTH,
  },
  {
    text: 'A combination of uppercase and lowercase letters.',
    type: PasswordRequirements.BOTH_CASES,
  },
  {
    text: 'Inclusion of numbers and special characters (e.g., !, @, #).',
    type: PasswordRequirements.SPECIAL_CHARS,
  },
];

const NewPasswordForm = () => {
  const [success, setSuccess] = useState(false);
  const methods = useForm<NewPasswordSchemaType>({
    defaultValues: {
      password: '',
      confirm_password: '',
    },
    resolver: zodResolver(NewPasswordSchema),
  });

  const {
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = methods;

  const password = watch('password');

  const checkType = (type: PasswordRequirements) => {
    if (password) {
      switch (type) {
        case PasswordRequirements.MIN_LENGTH:
          return password.length >= 8;
        case PasswordRequirements.BOTH_CASES:
          return bothCasesPattern.test(password);
        case PasswordRequirements.SPECIAL_CHARS:
          return numAndSpecialPattern.test(password);
        default:
          return false;
      }
    } else {
      return false;
    }
  };

  const requirementsMet = requirements.every(({ type }) => checkType(type));

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await api.post(AUTH_EP.RESET_PASSWORD, {
        password: data.password,
      });

      if (res.status === 200) setSuccess(true);
    } catch (error) {
      setError('root', {
        type: 'custom',
        message:
          error instanceof AxiosError
            ? error.response?.data.message || 'Something went wrong'
            : 'Something went wrong',
      });
    }
  });

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} noValidate>
          <div className="space-y-4">
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />
            {requirementsMet && (
              <Input
                label="Confirm Password"
                name="confirm_password"
                type="password"
                placeholder="Confirm your password"
              />
            )}
          </div>

          {!requirementsMet && (
            <div className="mt-6">
              <h6 className="mb-4">
                <strong>Password Requirement</strong>
              </h6>

              <div className="space-y-[1.13rem]">
                {requirements.map(({ text, type }) => (
                  <div key={type} className="flex items-center gap-2 text-sm">
                    <Checkbox
                      className="data-[state=checked]:text-orenda-purple text-orenda-purple data-[state=checked]:bg-transparent"
                      key={type}
                      id={type}
                      checked={checkType(type)}
                    />

                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {errors.root && (
            <p className="error_message text-center mt-3">{errors.root.message}</p>
          )}

          <Button
            isLoading={isSubmitting}
            disabled={!requirementsMet}
            type="submit"
            className="mt-10"
          >
            Continue
          </Button>
        </form>
      </FormProvider>

      {success && <ResetSuccess className="fixed inset-0 bg-white" />}
    </>
  );
};
export default NewPasswordForm;
