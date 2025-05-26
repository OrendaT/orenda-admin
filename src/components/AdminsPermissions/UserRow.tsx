// components/AdminsPermissions/UserRow.tsx

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import UserActionMenu from './UserActionMenu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown } from 'lucide-react';
import { User, ROLE_PERMISSIONS, Role } from '@/types/user';
import { useUsers } from '@/hooks/useUsers';
import { useRoles } from '@/hooks/useRoles';
import Image from 'next/image'; // Added Next.js Image import
// Import the modal components
import ChangeRoleModal from './ChangeRoleModal';
import DeleteUserModal from './DeleteUserModal';
import SendMessageModal from './SendMessageModal';

interface UserRowProps {
  user: User;
}

// Define UI permission options
type UIPermission = 'Add contents' | 'Edit contents' | 'Approve contents' | 'All controls';

// Mapping from backend permissions to UI permissions (simplified for single selection)
const getUIPermission = (role: Role): UIPermission => {
  const rolePermissions = ROLE_PERMISSIONS[role] || [];
  
  // Check which UI permission best matches this role
  if (rolePermissions.length >= 4 && rolePermissions.includes('create_user') && 
      rolePermissions.includes('edit_user') && rolePermissions.includes('view_all')) {
    return 'All controls';
  }
  
  if (rolePermissions.includes('view_all') || rolePermissions.includes('manage_providers')) {
    return 'Approve contents';
  }
  
  if (rolePermissions.includes('edit_user')) {
    return 'Edit contents';
  }
  
  if (rolePermissions.includes('create_user')) {
    return 'Add contents';
  }
  
  // Default for Provider or roles with minimal permissions
  return 'Add contents';
};

// Mapping from UI permission to appropriate role
const getRoleFromUIPermission = (permission: UIPermission): Role => {
  switch (permission) {
    case 'All controls':
      return 'SuperAdmin';
    case 'Approve contents':
      return 'ContentManager';
    case 'Edit contents':
      return 'ContentManager';
    case 'Add contents':
      return 'ProviderManager';
    default:
      return 'ProviderManager';
  }
};

const UserRow: React.FC<UserRowProps> = ({ user }) => {
  const [isActionMenuOpen, setIsActionMenuOpen] = useState<boolean>(false);
  const [isPermissionDropdownOpen, setIsPermissionDropdownOpen] = useState<boolean>(false);
  const [isUpdatingPermissions, setIsUpdatingPermissions] = useState<boolean>(false);
  
  // Modal states
  const [showChangeRoleModal, setShowChangeRoleModal] = useState<boolean>(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [showMessageModal, setShowMessageModal] = useState<boolean>(false);
  
  // Local state for immediate UI updates
  const [localSelectedPermission, setLocalSelectedPermission] = useState<UIPermission>(getUIPermission(user.role));
  
  // Refs for click outside handling
  const actionMenuRef = useRef<HTMLDivElement>(null);
  const permissionDropdownRef = useRef<HTMLDivElement>(null);

  // Get the useUsers hook for role changing and role display
  const { changeUserRole } = useUsers();
  const { getRoleDisplayName } = useRoles();

  // Update local state when user prop changes
  useEffect(() => {
    setLocalSelectedPermission(getUIPermission(user.role));
  }, [user.role]);

  // Get initials for avatar if no image
  const getInitials = (firstName?: string, lastName?: string, name?: string): string => {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    }
    return '?';
  };

  const displayName = user.first_name && user.last_name 
    ? `${user.first_name} ${user.last_name}`
    : user.name || 'Unknown User';

  // All available UI permission options
  const allUIPermissions: UIPermission[] = ['Add contents', 'Edit contents', 'Approve contents', 'All controls'];

  // Handle permission checkbox changes (only one can be selected)
  const handlePermissionChange = async (permission: UIPermission, isChecked: boolean) => {
    if (!isChecked) {
      // Don't allow unchecking - user must select a different option
      return;
    }

    // Update local state immediately for instant UI feedback
    setLocalSelectedPermission(permission);
    
    // Determine the appropriate role for the selected permission
    const newRole = getRoleFromUIPermission(permission);
    
    // Only update if the role would actually change
    if (newRole !== user.role) {
      setIsUpdatingPermissions(true);
      try {
        await changeUserRole(user.id, newRole);
        // The component will re-render with new role after the change
      } catch (error) {
        console.error('Failed to update permissions:', error);
        // Revert local state on error
        setLocalSelectedPermission(getUIPermission(user.role));
        // You could add a toast notification here
      } finally {
        setIsUpdatingPermissions(false);
      }
    }
  };

  // Functions to handle modal opening
  const handleChangeRole = () => {
    setShowChangeRoleModal(true);
  };

  const handleDeleteUser = () => {
    setShowDeleteConfirm(true);
  };

  const handleSendMessage = () => {
    setShowMessageModal(true);
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        setIsActionMenuOpen(false);
      }
      if (permissionDropdownRef.current && !permissionDropdownRef.current.contains(event.target as Node)) {
        setIsPermissionDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="grid grid-cols-12 p-4 border-b items-center hover:bg-gray-50">
        {/* User column */}
        <div className="col-span-4 flex items-center gap-3">
          <Avatar className="h-10 w-10 bg-purple-100 text-purple-800">
            {user.avatar ? (
              <Image 
                src={user.avatar} 
                alt={displayName} 
                width={40}
                height={40}
                className="h-full w-full object-cover rounded-full"
              />
            ) : (
              <AvatarFallback className="bg-purple-100 text-purple-800 font-medium">
                {getInitials(user.first_name, user.last_name, user.name)}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <div className="font-medium text-[13.4px] text-gray-900">
              {displayName}
              {user.isCurrentUser && <span className="text-gray-500 ml-1">(You)</span>}
            </div>
            <div className="text-[11.9px] text-gray-500">{user.email}</div>
          </div>
        </div>

        {/* Role column - Updated to show spaced names */}
        <div className="col-span-3">
          <span className="text-gray-900 text-[13px]">{getRoleDisplayName(user.role)}</span>
        </div>

        {/* Access control column - Updated with single-select checkboxes */}
        <div className="col-span-4" ref={permissionDropdownRef}>
          <div className="relative">
            <Button 
              variant="ghost" 
              className="w-[50%] justify-start text-sm h-9 hover:bg-gray-100 border-none px-2"
              onClick={() => setIsPermissionDropdownOpen(!isPermissionDropdownOpen)}
              disabled={isUpdatingPermissions}
            >
              <span className={isUpdatingPermissions ? "opacity-50" : ""}>
                {isUpdatingPermissions ? "Updating..." : localSelectedPermission}
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isPermissionDropdownOpen ? 'transform rotate-180' : ''}`} />
            </Button>
            
            {isPermissionDropdownOpen && (
              <div className="absolute mt-1 w-48 rounded-md shadow-lg bg-white border border-gray-100 z-10">
                <div className="py-3 px-4 space-y-3">
                  {allUIPermissions.map((permission) => {
                    const isChecked = localSelectedPermission === permission;
                    return (
                      <div key={permission} className="flex items-center space-x-3">
                        <Checkbox 
                          id={`permission-${user.id}-${permission}`}
                          checked={isChecked}
                          onCheckedChange={(checked) => handlePermissionChange(permission, checked as boolean)}
                          disabled={isUpdatingPermissions}
                          className="data-[state=checked]:bg-[#2E0086] data-[state=checked]:border-[#2E0086] border-gray-300"
                        />
                        <label
                          htmlFor={`permission-${user.id}-${permission}`}
                          className="text-sm font-medium cursor-pointer flex-1"
                        >
                          {permission}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions column */}
        <div className="col-span-1 relative" ref={actionMenuRef}>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full hover:bg-gray-100"
            onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
          >
            <FiMoreVertical className="h-4 w-4" />
          </Button>
          
          {isActionMenuOpen && (
            <UserActionMenu 
              user={user} 
              onClose={() => setIsActionMenuOpen(false)}
              onChangeRole={handleChangeRole}
              onDeleteUser={handleDeleteUser}
              onSendMessage={handleSendMessage}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      {showChangeRoleModal && (
        <ChangeRoleModal
          user={user}
          isOpen={showChangeRoleModal}
          onClose={() => setShowChangeRoleModal(false)}
        />
      )}

      {showDeleteConfirm && (
        <DeleteUserModal
          user={user}
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
        />
      )}

      {showMessageModal && (
        <SendMessageModal
          user={user}
          isOpen={showMessageModal}
          onClose={() => setShowMessageModal(false)}
        />
      )}
    </>
  );
};

export default UserRow;