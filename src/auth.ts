import NextAuth, { DefaultSession } from 'next-auth';
import providers from './lib/authjs/providers';
import callbacks from './lib/authjs/callbacks';
import { DBUser } from './types';

interface JWTExtension extends Omit<DBUser, 'user'> {
  name: string | null;
  email: string;
  id: string;
  expires_at: number;
  roles: DBUser['user']['roles'];
  permissions: DBUser['user']['permissions'];
}

declare module 'next-auth' {
  interface User extends DBUser {
    empty?: boolean; //added to satisfy eslint
  }

  interface Session {
    error?: 'RefreshTokenError';
    access_token: string;
    user: DefaultSession['user'] & {
      email: string;
      roles: DBUser['user']['roles'];
      permissions: DBUser['user']['permissions'];
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
