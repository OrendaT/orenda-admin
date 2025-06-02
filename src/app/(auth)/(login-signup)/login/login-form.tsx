'use client';

import Input from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoginSchema, LoginSchemaType } from '@/lib/schemas/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';
import { IoCheckmarkCircleOutline, IoCloseOutline } from 'react-icons/io5';
import OrDivider from '../_components/or-divider';
import { AnimatePresence, motion } from 'motion/react';
import GoogleAuthButton from '../_components/google-auth-button';
import { login } from '@/app/actions/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const LoginForm = () => {
  const { push } = useRouter();
  const { update } = useSession();
  const methods = useForm<LoginSchemaType>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginSchema),
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
    setError,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const res = await login(data);

    if (res.success) {
      toast.success(res.message);
      update();
      push('/');
    }
    if (res.error) setError('root', res.error);
  });

  return (
    <>
      <AnimatePresence>
        {errors.root && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="border-l-error-red mb-10 flex items-center justify-around gap-4 rounded-lg border border-l-8 border-[#E7E7E7] p-4"
          >
            <div>
              <div className="border-error-red grid size-8 place-items-center rounded-[0.32294rem] border-[1.292px] bg-[#FDE5D7]">
                <IoCheckmarkCircleOutline className="text-error-red size-6 rounded-full bg-white" />
              </div>
            </div>
            <p className="text-sm font-medium">{errors.root.message}</p>
            <button
              type="button"
              onClick={() => clearErrors('root')}
              className="cursor-pointer border-l border-[#DDD8CB] ps-3"
            >
              <IoCloseOutline className="size-7 text-[#0F0F0F]" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <h1 className="auth_page_heading mb-2">Welcome back!</h1>

      <GoogleAuthButton />

      <OrDivider />

      <FormProvider {...methods}>
        <form className="mt-4" onSubmit={onSubmit} noValidate>
          <div className="space-y-4">
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
              placeholder="Enter your password"
            />
          </div>

          <Link
            className="mt-4 block w-fit text-sm underline underline-offset-2 transition-all duration-300 hover:font-medium"
            href="/password/reset"
          >
            Forgot password?
          </Link>

          <Button isLoading={isSubmitting} type="submit" className="mt-8">
            Login
          </Button>

          <p className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link
              href="/sign-up"
              className="text-orenda-purple font-bold underline underline-offset-2"
            >
              Sign up
            </Link>
          </p>
        </form>
      </FormProvider>
    </>
  );
};
export default LoginForm;
