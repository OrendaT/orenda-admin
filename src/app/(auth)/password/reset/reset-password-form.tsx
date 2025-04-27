'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';

import Input from '@/components/ui/input';
import { LoginSchema } from '@/lib/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import CheckMail from '@/components/auth/check-mail';
import { useState } from 'react';

const ResetPasswordSchema = LoginSchema.pick({
  email: true,
});

const ResetPasswordForm = () => {
  const [success, setSuccess] = useState(false);
  const methods = useForm({
    defaultValues: { email: '' },
    resolver: zodResolver(ResetPasswordSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    setSuccess(true);
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

      {success && <CheckMail className="fixed inset-0 bg-white" />}
    </>
  );
};
export default ResetPasswordForm;
