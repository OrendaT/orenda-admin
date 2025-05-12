import { NextAuthConfig } from 'next-auth';
import api from '../api/axios';
import { AUTH_EP } from '../api/endpoints';
import { JWT } from 'next-auth/jwt';
import { jwtDecode } from 'jwt-decode';

type Callbacks = NextAuthConfig['callbacks'];

const callbacks: Callbacks = {
  jwt: async ({ token, account, user }) => {
    if (account && user) {
      // First-time login, save the `access_token`, its expiry and the `refresh_token`

      const decoded = jwtDecode<{ exp: number }>(user.access_token);
      const expires_at = decoded?.exp
        ? decoded.exp * 1000
        : Date.now() + 60_000;

      return {
        ...token,
        access_token: user.access_token,
        refresh_token: user.refresh_token,
        expires_at,
      } as JWT;
    }

    if (token.expires_at && Date.now() < token.expires_at - 60_000) {
      return token;
    } else {
      // Subsequent logins, but the `access_token` has expired, try to refresh it
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
          },
        );

        const decoded = jwtDecode<{ exp: number }>(res.data.access_token);
        const expires_at = decoded?.exp
          ? decoded.exp * 1000
          : Date.now() + 60_000;

        return {
          ...token,
          access_token: res.data.access_token,
          expires_at,
        } as JWT;
      } catch (error) {
        console.error('Error refreshing access_token', error);
        // If we fail to refresh the token, return an error so we can handle it on the page
        token.error = 'RefreshTokenError';

        return token;
      }
    }
  },
  session: async ({ session, token }) => {
    session.access_token = token.access_token;
    session.error = token.error;
    return session;
  },
};

export default callbacks;
