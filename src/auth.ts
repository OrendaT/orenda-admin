import NextAuth, { DefaultSession } from 'next-auth';
import providers from './lib/authjs/providers';
import callbacks from './lib/authjs/callbacks';

interface JWTExtension {
  access_token: string;
  expires_at: number;
  refresh_token?: string;
}

declare module 'next-auth' {
  interface User {
    name: string;
    access_token: string;
    refresh_token: string;
  }

  interface Session {
    error?: 'RefreshTokenError';
    access_token: string;
    user: DefaultSession['user'];
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
