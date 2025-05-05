'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { logOut } from '@/app/actions/auth';

export default function AuthWatcher() {
  const { data: session, status } = useSession();

  useEffect(() => {
    const checkStatus = async () => {
      if (
        status === 'authenticated' &&
        session?.error === 'RefreshTokenError'
      ) {
        await logOut();
      }

      checkStatus();
    };
  }, [session, status]);

  return null;
}
