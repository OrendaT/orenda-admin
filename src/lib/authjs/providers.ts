import Credentials from 'next-auth/providers/credentials';
import Google, { GoogleProfile } from 'next-auth/providers/google';
import { LoginSchema } from '../schemas/auth';
import api from '../api/axios';
import { AUTH_EP } from '../api/endpoints';
import { AxiosError } from 'axios';

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
          throw error;
        }
      }

      console.log(user);
      return user;
    },
  }),
  Google({
    profile: async (profile: GoogleProfile) => {
      let user = null;
      try {
        const res = await api.post(AUTH_EP.LOGIN, {
          email: profile.email,
          sub: profile.sub,
        });
        user = res.data;
      } catch (error) {
        if (
          error instanceof AxiosError &&
          error.response?.data.message === 'Login error'
        ) {
          const res = await api.post(AUTH_EP.REGISTER, {
            email: profile.email,
            sub: profile.sub,
          });
          user = res.data;
        }
      }

      return user;
    },
    authorization: { params: { access_type: 'offline', prompt: 'consent' } },
  }),
];

export default providers;
