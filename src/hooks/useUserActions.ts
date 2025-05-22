// hooks/useUserActions.ts

import { userService } from '@/services/userService';
import { Role } from '@/types/user';

export function useUserActions() {
  const changeRole = async (userId: string, newRole: Role) => {
    try {
      await userService.changeRole(userId, newRole);
      // Refresh the page or update local state
      window.location.reload(); // Simple approach - you can improve this later
      return { success: true };
    } catch (error) {
      console.error('Failed to change role:', error);
      return { success: false, error };
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await userService.deleteUser(userId);
      // Refresh the page or update local state
      window.location.reload(); // Simple approach - you can improve this later
      return { success: true };
    } catch (error) {
      console.error('Failed to delete user:', error);
      return { success: false, error };
    }
  };

  const sendMessage = async (userId: string, subject: string, message: string) => {
    try {
      // You'll need to implement this in your userService
      // For now, we'll simulate the API call
      console.log(`Sending message to user ${userId}:`, { subject, message });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // When you implement the real API, replace the above with:
      // await userService.sendMessage(userId, subject, message);
      
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

// Keep the default export if that's how you're importing it
export default useUserActions;