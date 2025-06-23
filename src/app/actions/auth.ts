'use server';

import {
  LoginSchemaType,
  SignUpSchema,
  SignUpSchemaType,
} from '@/lib/schemas/auth-schema';
import { signIn, signOut } from '@/auth';
import { AUTH_EP } from '@/lib/api/endpoints';
import api from '@/lib/api/axios';
import { AxiosError } from 'axios';
import { AuthError } from 'next-auth';

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
  } catch (error) {
    console.log(error);
    return {
      error: {
        name: error instanceof AuthError ? error.name : 'Login Error',
        message:
          error instanceof AuthError ? (error.message || 'Something went wrong') : 'Something went wrong',
        custom:
          'Incorrect login details. Please check your details and try again.',
      },
    };
  }
};

export const logOut = async () => {
  await signOut({ redirectTo: '/login' });

  return {
    success: true,
    message: 'Log out successful',
  };
};

export const register = async (data: SignUpSchemaType) => {
  const validatedFields = SignUpSchema.safeParse(data);

  if (validatedFields.error) {
    return {
      success: false,
      message: 'Failed to validated fields',
    };
  }

  try {
    const res = await api.request({
      url: AUTH_EP.REGISTER,
      method: 'POST',
      data: validatedFields.data,
    });

    return {
      success: true,
      message: res.data?.message || 'Registration successful',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message:
        error instanceof AxiosError
          ? error.response?.data?.message
          : 'Failed to register',
    };
  }
};
