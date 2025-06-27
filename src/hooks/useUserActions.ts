// hooks/useUserActions.ts

import { Role } from '@/types/user';
import { createUserService } from '@/services/userService';
import useAxios from '@/lib/api/axios-client';

export function useUserActions() {
  const { axios } = useAxios(); // Get token-bound Axios instance
  const userService = createUserService(axios); // Inject it into service

  const changeRole = async (userId: string, newRole: Role) => {
    try {
      await userService.changeRole(userId, newRole);
      window.location.reload(); // TODO: Replace with state update later
      return { success: true };
    } catch (error) {
      console.error('Failed to change role:', error);
      return { success: false, error };
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await userService.deleteUser(userId);
      window.location.reload(); // TODO: Replace with state update later
      return { success: true };
    } catch (error) {
      console.error('Failed to delete user:', error);
      return { success: false, error };
    }
  };

  const sendMessage = async (userId: string, subject: string, message: string) => {
    try {
      console.log(`Sending message to user ${userId}:`, { subject, message });
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    } catch (error) {
      console.error('Failed to send message:', error);
      return { success: false, error };
    }
  };

  return {
    changeRole,
    deleteUser,
    sendMessage,
  };
}

export default useUserActions;
