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
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

const requirements = [
  {
    text: 'A minimum length, typically 8 to 12 characters.',
    type: 'minLength',
  },
  {
    text: 'A combination of uppercase and lowercase letters.',
    type: 'bothCases',
  },
  {
    text: 'Inclusion of numbers and special characters (e.g., !, @, #).',
    type: 'specialChars',
  },
] as const;

const NewPasswordForm = ({ token }: { token: string }) => {
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
    watch,
    formState: { isSubmitting },
  } = methods;

  const password = watch('password');

  const checkType = (type: (typeof requirements)[number]['type']) => {
    if (password) {
      switch (type) {
        case 'minLength':
          return password.length >= 8;
        case 'bothCases':
          return bothCasesPattern.test(password);
        case 'specialChars':
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
      const res = await api.post(
        AUTH_EP.RESET_PASSWORD,
        {
          password: data.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.status === 200) setSuccess(true);
    } catch (error) {
      const message = isAxiosError(error)
        ? error.response?.data.message || 'Something went wrong'
        : 'Something went wrong';
      toast.error(message);
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
