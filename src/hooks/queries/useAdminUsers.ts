import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api/axios';
import { getSession } from 'next-auth/react';

export const useAdminUsers = () => {
  return useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const session = await getSession();

      if (!session?.access_token) {
        throw new Error('No access token');
      }

      const res = await api.get('/admin/users', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      return res.data;
    },
  });
};