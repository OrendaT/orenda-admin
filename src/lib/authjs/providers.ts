import Credentials from 'next-auth/providers/credentials';
import Google, { GoogleProfile } from 'next-auth/providers/google';
import { LoginSchema } from '../schemas/auth-schema';
import api from '../api/axios';
import { AUTH_EP } from '../api/endpoints';
import { AxiosError } from 'axios';
import { CredentialsSignin, OAuthSignInError } from '@auth/core/errors';
import { DBUser } from '@/types';

class CredentialsError extends CredentialsSignin {
  code = 'custom';

  constructor(name: string, message: string) {
    super();
    this.name = name;
    this.message = message;
  }
}

class OAuthError extends OAuthSignInError {
  code = 'custom';

  constructor(name: string, message: string) {
    super();
    this.name = name;
    this.message = message;
  }
}

const providers = [
  Credentials({
    credentials: {
      email: {},
      password: {},
    },
    authorize: async (credentials) => {
      let user = null;

      const validatedFields = LoginSchema.safeParse(credentials);

      if (validatedFields.success) {
        try {
          const res = await api.post(AUTH_EP.LOGIN, validatedFields.data);
          user = res.data;
        } catch (error) {
          throw new CredentialsError(
            'Login error',
            error instanceof AxiosError
              ? error.response?.data?.message
              : 'Something went wrong',
          );
        }
      }

      return user;
    },
  }),
  Google({
    profile: async (profile: GoogleProfile): Promise<DBUser> => {
      let user = null;
      const { email, sub, family_name, given_name } = profile;
      const name = `${given_name} ${family_name}`;

      // Login or sign-up user
      try {
        const res = await api.post(AUTH_EP.LOGIN_GOOGLE, {
          email,
          sub,
        });
        user = {
          ...profile,
          access_token: res.data.access_token,
          refresh_token: res.data.refresh_token,
          user: {
            id: res.data.user.id,
            name: res.data.user.name,
            email,
            roles: res.data.user.roles,
          },
        };
      } catch (loginError) {
        if (
          loginError instanceof AxiosError &&
          loginError.response?.data?.message ===
            'Invalid google credentials or inactive user'
        ) {
          try {
            const res = await api.post(AUTH_EP.REGISTER_GOOGLE, {
              email,
              sub,
              name,
            });
            user = {
              ...profile,
              access_token: res.data.access_token,
              refresh_token: res.data.refresh_token,
              user: {
                id: res.data.user.id,
                name,
                email,
                roles: res.data.user.roles,
              },
            };
          } catch (registerError) {
            // Handle register failure here
            console.error('Registration failed:', registerError);
            throw new OAuthError(
              'Google LoginError',
              'Login and registration both failed.',
            );
          }
        } else {
          // Handle unexpected login errors (not invalid credentials)
          console.error('Login failed:', loginError);
          throw new OAuthError(
            'Google LoginError',
            loginError instanceof AxiosError
              ? loginError.response?.data?.message
              : 'Login failed.',
          );
        }
      }

      return user;
    },
  }),
];

export default providers;
