'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { useAuthStore } from '@/stores/auth-store';

export default function AuthWatcher() {
  const { data: session, status } = useSession();
  const setStatus = useAuthStore((s) => s.setStatus);

  useEffect(() => {
    setStatus(status);
    if (status === 'authenticated' && session?.error === 'RefreshTokenError') {
      signOut({ callbackUrl: '/login' }); // or to your login page
    }
  }, [session, status, setStatus]);

  return null;
}
