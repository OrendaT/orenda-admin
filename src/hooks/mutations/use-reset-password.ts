import { useMutation } from '@tanstack/react-query';

import api from '@/lib/api/axios';
import { AUTH_EP } from '@/lib/api/endpoints';

const useResetPassword = () => {
  return useMutation({
    mutationFn: async (data: { email: string }) =>
      await api.post<{ message: string; success: boolean }>(
        AUTH_EP.RESET_PASSWORD_REQUEST,
        data,
      ),
  });
};
export default useResetPassword;
