// hooks/useRoles.ts
import { Role } from '@/types/user';

export function useRoles() {
  const availableRoles: Role[] = ['Admin', 'Manager', 'Provider'];

  const getRoleDisplayName = (role: Role): string => {
    switch (role) {
      case 'Admin':
        return 'Admin';
      case 'Manager':
        return 'Manager';
      case 'Provider':
        return 'Provider';
      default:
        return role;
    }
  };

  const getRoleFromDisplayName = (displayName: string): Role => {
    switch (displayName) {
      case 'Admin':
      case 'Manager':
      case 'Provider':
        return displayName;
      default:
        throw new Error(`Unknown display name: ${displayName}`);
    }
  };

  return {
    availableRoles,
    getRoleDisplayName,
    getRoleFromDisplayName,
  };
}
