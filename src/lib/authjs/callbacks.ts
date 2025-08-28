// app/auth/callbacks.ts
import { NextAuthConfig } from 'next-auth';
import api from '../api/axios';
import { AUTH_EP } from '../api/endpoints';
import { JWT } from 'next-auth/jwt';
import { jwtDecode } from 'jwt-decode';

type Callbacks = NextAuthConfig['callbacks'];

const callbacks: Callbacks = {
  jwt: async ({ token, account, user }) => {
    if (account && user) {
      const decoded = jwtDecode<{ exp: number }>(user.access_token);
      const expires_at = decoded?.exp ? decoded.exp * 1000 : Date.now() + 60_000;

      return {
        ...token,
        access_token: user.access_token,
        refresh_token: user.refresh_token,
        name: user.user?.name,
        email: user.user.email,
        roles: user.user.roles,
        teams: user.user.teams,
        expires_at,
      } as JWT;
    }

    if (token.expires_at && Date.now() < token.expires_at - 60_000) {
      return token;
    }

    if (!token.refresh_token) {
      token.error = 'RefreshTokenError';
      return token;
    }

    try {
      const res = await api.post(
        AUTH_EP.REFRESH,
        {},
        {
          headers: {
            Authorization: `Bearer ${token.refresh_token}`,
          },
        }
      );

      const decoded = jwtDecode<{ exp: number }>(res.data.access_token);
      const expires_at = decoded?.exp ? decoded.exp * 1000 : Date.now() + 60_000;

      return {
        ...token,
        access_token: res.data.access_token,
        expires_at,
      } as JWT;
    } catch (error) {
      console.error('Error refreshing access_token', error);
      token.error = 'RefreshTokenError';
      return token;
    }
  },

  session: async ({ session, token }) => {
    session.access_token = token.access_token;
    session.user.name = token.name;
    session.user.email = token.email ?? '';
    session.user.roles = token.roles;
    session.user.teams = token.teams;
    session.error = token.error;
    return session;
  },
};

export default callbacks;