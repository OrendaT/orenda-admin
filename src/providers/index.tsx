'use client';

import { SessionProvider } from 'next-auth/react';
import AuthWatcher from '@/components/auth/auth-watcher';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/hooks/queries/query-client';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <AuthWatcher />
        {children}
      </SessionProvider>

    </QueryClientProvider>
  );
};
export default Providers;
