// components/AdminsPermissions/PermissionDropdown.tsx

import React from 'react';
import { User, ROLE_PERMISSIONS } from '@/types/user';

interface PermissionDropdownProps {
  user: User;
  onClose: () => void;
}

const PermissionDropdown: React.FC<PermissionDropdownProps> = ({ user, onClose }) => {
  // Get permissions based on role
  const rolePermissions = ROLE_PERMISSIONS[user.role] || [];

  return (
    <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
      <div className="py-1 px-3">
        <h4 className="text-sm font-medium mb-2">Role Permissions:</h4>
        <ul className="text-xs space-y-1 ml-4 list-disc">
          {rolePermissions.map(permission => (
            <li key={permission}>{permission}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PermissionDropdown;