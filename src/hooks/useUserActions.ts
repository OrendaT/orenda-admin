// hooks/useUserActions.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Role } from '@/types/user';
import { createUserService } from '@/services/userService';
import useAxios from '@/lib/api/axios-client';

type SuccessResponse = { success: boolean };

export default function useUserActions() {
  const { axios } = useAxios();
  const userService = createUserService(axios);
  const qc = useQueryClient();

  // ─── Change Role Mutation ────────────────
  const changeRoleMutation = useMutation({
    mutationFn: ({ userId, newRole }: { userId: string; newRole: Role }): Promise<SuccessResponse> =>
      userService.changeRole(userId, newRole),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['all_users'] });
    },
  });

  // ─── Delete User Mutation ────────────────
  const deleteUserMutation = useMutation({
    mutationFn: (userId: string): Promise<SuccessResponse> =>
      userService.deleteUser(userId),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['all_users'] });
    },
  });

  // ─── Public Handlers ─────────────────────
  const changeRole = (userId: string, newRole: Role) => {
    return changeRoleMutation.mutateAsync({ userId, newRole });
  };

  const deleteUser = (userId: string) => {
    return deleteUserMutation.mutateAsync(userId);
  };

  const sendMessage = async (
    userId: string,
    subject: string,
    message: string
  ): Promise<SuccessResponse> => {
    console.log(`Send message to ${userId}`, { subject, message });
    await new Promise((res) => setTimeout(res, 1000));
    return { success: true };
  };

  return {
    changeRole,
    deleteUser,
    sendMessage,
  };
}
