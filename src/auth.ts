import NextAuth, { DefaultSession } from 'next-auth';
import providers from './lib/authjs/providers';
import callbacks from './lib/authjs/callbacks';

interface JWTExtension {
  name: string | null;
  email: string;
  id: string;
  access_token: string;
  expires_at: number;
  refresh_token?: string;
  roles: { name: string; permissions: string[] }[];
}

declare module 'next-auth' {
  interface User {
    access_token: string;
    refresh_token?: string;
    user: {
      name: string | null;
      email: string;
      roles: { name: string; permissions: string[] }[];
      id: string;
    };
  }

  interface Session {
    error?: 'RefreshTokenError';
    access_token: string;
    user: DefaultSession['user'] & {
      email: string;
      roles: { name: string; permissions: string[] }[];
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends JWTExtension {
    error?: 'RefreshTokenError';
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  callbacks,
});
