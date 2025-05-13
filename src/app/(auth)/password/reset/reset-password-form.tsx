'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';

import Input from '@/components/ui/input';
import { LoginSchema } from '@/lib/schemas/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import CheckMail from '@/components/auth/check-mail';
import { useState } from 'react';
import api from '@/lib/api/axios';
import { AUTH_EP } from '@/lib/api/endpoints';

const ResetPasswordSchema = LoginSchema.pick({
  email: true,
});

const ResetPasswordForm = () => {
  const [success, setSuccess] = useState(false);
  const methods = useForm({
    defaultValues: { email: '' },
    resolver: zodResolver(ResetPasswordSchema),
  });

  const { handleSubmit, setError, watch } = methods;

  const email = watch('email');

  const onSubmit = handleSubmit(async (data) => {
    const res = await api.post(AUTH_EP.RESET_PASSWORD_REQUEST, data);
    if (res.status === 200) {
      setSuccess(true);
    } else {
      setError('email', { message: 'Something went wrong' });
    }
  });

  return (
    <>
      <FormProvider {...methods}>
        <form className="w-full" onSubmit={onSubmit} noValidate>
          <Input
            label="Email address"
            name="email"
            type="email"
            placeholder="Enter your email"
          />

          <Button type="submit" className="mt-10">
            Continue
          </Button>
        </form>
      </FormProvider>

      {success && (
        <CheckMail className="fixed inset-0 bg-white" email={email} />
      )}
    </>
  );
};
export default ResetPasswordForm;
