'use client';

import AccountCreated from '@/components/auth/account-created';
import Input from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SignUpSchema, SignUpSchemaType } from '@/lib/schemas/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import GoogleAuthButton from '../_components/google-auth-button';
import OrDivider from '../_components/or-divider';
import { register } from '@/app/actions/auth';
import { toast } from 'sonner';

const SignUpForm = () => {
  const [success, setSuccess] = useState(false);

  const methods = useForm<SignUpSchemaType>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
    resolver: zodResolver(SignUpSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const res = await register(data);
    if (res.success) {
      setSuccess(true);
    } else {
      toast.error(res.message);
    }
  });

  return (
    <>
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

          <Button isLoading={isSubmitting} type="submit" className="mt-8">
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
    </>
  );
};
export default SignUpForm;
