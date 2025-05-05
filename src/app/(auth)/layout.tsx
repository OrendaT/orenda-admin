import Header from '@/components/layout/header';

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
export default AuthLayout;
