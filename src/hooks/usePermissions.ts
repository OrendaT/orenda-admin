// hooks/usePermissions.ts

import { Permission, ROLE_PERMISSIONS, Role } from '@/types/user';

export function usePermissions() {
  // Get permissions for a specific role
  const getPermissionsForRole = (role: Role): Permission[] => {
    return ROLE_PERMISSIONS[role] || [];
  };

  return {
    getPermissionsForRole,
  };
}