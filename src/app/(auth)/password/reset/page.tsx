import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ResetPasswordForm from './reset-password-form';

export const metadata = {
  title: 'Reset Password',
  description: 'Reset password page',
};

const ResetPassword = () => {
  return (
    <main className="padding_inline box_center">
      <section className="relative w-full max-w-[23.5rem]">
        <Link
          className="clamp-[gap,1,2] clamp-[left,0,-8rem] absolute -top-4 flex items-center text-sm font-medium sm:top-2.5"
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

        <ResetPasswordForm />
      </section>
    </main>
  );
};
export default ResetPassword;
