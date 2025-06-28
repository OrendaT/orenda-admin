'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { logOut } from '@/app/actions/auth';

export default function AuthWatcher() {
  const { data: session, status } = useSession();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    const maybeLogOut = async () => {
      if (
        isMounted &&
        status !== 'unauthenticated' &&
        session?.error === 'RefreshTokenError'
      ) {
        await logOut();
      }
    };

    maybeLogOut();
  }, [isMounted, session?.error, status]);

  return null;
}
