'use client';

import AccountCreated from '@/components/auth/account-created';
import Input from '@/components/input';
import Button from '@/components/ui/custom-button';
import { SignUpSchema, SignUpSchemaType } from '@/lib/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import GoogleAuthButton from '../_components/google-auth-button';
import OrDivider from '../_components/or-divider';

const SignUp = () => {
  const [success, setSuccess] = useState(false);

  const methods = useForm<SignUpSchemaType>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(SignUpSchema),
  });
  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    setSuccess(true);
  });

  return (
    <section className="w-full">
      <h1 className="auth_page_heading mb-2">Create your account</h1>
      <p className="clamp-[text,sm,base] text-center">
        Get started by creating your account.
      </p>

      <GoogleAuthButton />

      <OrDivider />

      <FormProvider {...methods}>
        <form className="mt-4" onSubmit={onSubmit} noValidate>
          <div className="space-y-2.5">
            <Input label="Name" name="name" placeholder="Enter your name" />

            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Create password"
            />
          </div>

          <Button type="submit" className="mt-8">
            Sign up
          </Button>

          <p className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-orenda-purple font-bold underline underline-offset-2"
            >
              Log In
            </Link>
          </p>
        </form>
      </FormProvider>

      {success && <AccountCreated className="fixed inset-0 bg-white" />}
    </section>
  );
};
export default SignUp;
