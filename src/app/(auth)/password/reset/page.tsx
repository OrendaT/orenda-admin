'use client';

import { FormProvider, useForm } from 'react-hook-form';
import Button from '@/components/ui/custom-button';
import Link from 'next/link';
import Input from '@/components/input';
import { LoginSchema } from '@/lib/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import CheckMail from '@/components/auth/check-mail';
import { useState } from 'react';

const ResetPasswordSchema = LoginSchema.pick({
  email: true,
});

const ResetPassword = () => {
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
    <main className="padding_inline box_center">
      <section className="relative w-full max-w-[23.5rem]">
        <Link
          className="clamp-[gap,1,2] clamp-[left,0,-8rem] sm:top-2.5 -top-4 absolute flex items-center text-sm font-medium"
          href="/login"
        >
          <ArrowLeft className="clamp-[size,4,5]" />
          BACK
        </Link>

        <h1 className="auth_page_heading">Reset password</h1>

        <p className="mx-auto my-6 max-w-[23.5rem] text-center text-base">
          Provide the email address linked to your account to receive a reset
          password link.
        </p>

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
      </section>

      {success && <CheckMail className="fixed inset-0 bg-white" />}
    </main>
  );
};
export default ResetPassword;
