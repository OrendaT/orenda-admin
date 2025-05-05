'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

export default function AuthWatcher() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated' && session?.error === 'RefreshTokenError') {
      signOut({ callbackUrl: '/login' }); // or to your login page
    }
  }, [session, status]);

  return null;
}
