import { auth } from '@/auth';
import Header from '@/components/layout/header';
import { redirect } from 'next/navigation';

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
};
export default AuthLayout;