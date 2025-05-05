'use server';

import { LoginSchemaType } from '@/lib/schemas/auth';
import { signIn, signOut } from '@/auth';

export const login = async (data: LoginSchemaType) => {
  try {
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false, // Prevent automatic redirect
    });

    return {
      success: true,
      message: 'Login successful',
    };
  } catch {
    return {
      error: {
        name: 'Login error',
        message:
          'Incorrect login details. Please check your details and try again.',
      },
    };
  }
};

export const logOut = async () => {
  await signOut({ redirectTo: '/' });

  return {
    success: true,
    message: 'Log out successful',
  };
};
