// components/AdminsPermissions/ChangeRoleModal.tsx

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { User, Role, ROLE_PERMISSIONS } from '@/types/user';
import { useRoles } from '@/hooks/useRoles';
import useUserActions from '@/hooks/useUserActions';

// Make sure the interface is properly defined
interface ChangeRoleModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

const ChangeRoleModal: React.FC<ChangeRoleModalProps> = ({ user, isOpen, onClose }) => {
  const { availableRoles, getRoleDisplayName } = useRoles();
  const { changeRole } = useUserActions();
  const [selectedRole, setSelectedRole] = useState<Role>(user.role);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (selectedRole === user.role) {
      onClose();
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await changeRole(user.id, selectedRole);
      if (result.success) {
        onClose();
      } else {
        alert('Failed to change user role. Please try again.');
      }
    } catch (error) {
      console.error('Failed to change user role:', error);
      alert('Failed to change user role. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRoleChange = (value: string) => {
    setSelectedRole(value as Role);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Change Role for {user.first_name} {user.last_name}
          </DialogTitle>
          
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Current Role: <span className="font-bold">{getRoleDisplayName(user.role)}</span>
            </label>
            <label className="block text-sm font-medium">
              Select new role:
            </label>
            <RadioGroup 
              value={selectedRole} 
              onValueChange={handleRoleChange}
              className="flex flex-col space-y-3"
            >
              {availableRoles.map((role) => (
                <div key={role} className="flex items-center space-x-2">
                  <RadioGroupItem value={role} id={`change-role-${role}`} />
                  <label htmlFor={`change-role-${role}`} className="text-sm">
                    {getRoleDisplayName(role)}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          {/* Display the permissions for the selected role */}
          {selectedRole && (
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Permissions for {getRoleDisplayName(selectedRole)}:
              </p>
              <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                {ROLE_PERMISSIONS[selectedRole]?.map((permission) => (
                  <li key={permission}>{permission}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex gap-3 mt-6">
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-[#2e0086] hover:bg-[#25006d] text-white"
              disabled={isSubmitting || selectedRole === user.role}
            >
              {isSubmitting ? 'Changing...' : 'Change Role'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeRoleModal;