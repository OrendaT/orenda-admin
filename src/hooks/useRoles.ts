// hooks/useRoles.ts

import { Role } from '@/types/user';

export function useRoles() {
  // Available roles with proper spacing for display
  const availableRoles: Role[] = [
    'SuperAdmin',
    'ContentManager', 
    'ProviderManager'
  ];

  // Function to convert role to display format with spaces
  const getRoleDisplayName = (role: Role): string => {
    switch (role) {
      case 'SuperAdmin':
        return 'Super Admin';
      case 'ContentManager':
        return 'Content Manager';
      case 'ProviderManager':
        return 'Provider Manager';
      case 'Owner':
        return 'Owner';
      default:
        return role;
    }
  };

  // Function to convert display name back to role value
  const getRoleFromDisplayName = (displayName: string): Role => {
    switch (displayName) {
      case 'Super Admin':
        return 'SuperAdmin';
      case 'ContentManager':
        return 'ContentManager';
      case 'ProviderManager':
        return 'ProviderManager';
      case 'Owner':
        return 'Owner';
      default:
        return displayName as Role;
    }
  };

  return {
    availableRoles,
    getRoleDisplayName,
    getRoleFromDisplayName,
  };
}