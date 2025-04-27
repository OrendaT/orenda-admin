import LoginForm from './login-form';

export const metadata = {
  title: 'Login',
  description: 'Login page',
};

const Login = () => {
  return (
    <section className="w-full">
      <LoginForm />
    </section>
  );
};
export default Login;
