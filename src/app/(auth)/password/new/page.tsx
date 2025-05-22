import { redirect } from 'next/navigation';
import NewPasswordForm from './new-password-form';

export const metadata = {
  title: 'New Password',
  description: 'New password page',
};

const NewPassword = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const token = (await searchParams).token?.toString();
  if (!token) {
    redirect('/password/reset');
  }

  return (
    <main className="padding_inline box_center">
      <section className="relative w-full max-w-[25rem]">
        <h1 className="auth_page_heading">Create new password</h1>

        <p className="mx-auto my-6 text-center text-base">
          Create a new password to your account.
        </p>

        <NewPasswordForm token={token} />
      </section>
    </main>
  );
};
export default NewPassword;
