import SignUpForm from './sign-up-form';

export const metadata = {
  title: 'Sign up',
  description: 'Sign up page',
};

const SignUp = () => {
  return (
    <section className="w-full">
      <h1 className="auth_page_heading mb-2">Create your account</h1>
      <p className="clamp-[text,sm,base] text-center">
        Get started by creating your account.
      </p>

      <SignUpForm />
    </section>
  );
};
export default SignUp;
