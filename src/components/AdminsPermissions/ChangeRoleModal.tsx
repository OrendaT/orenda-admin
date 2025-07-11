'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Role, ROLE_PERMISSIONS } from '@/types/user';
import { useRoles } from '@/hooks/useRoles';
import useUserActions from '@/hooks/useUserActions';
import { toast } from 'sonner';
import { UserData } from '@/types';


interface ChangeRoleModalProps {
  user: UserData;
  isOpen: boolean;
  onClose: () => void;
}

const ChangeRoleModal: React.FC<ChangeRoleModalProps> = ({ user, isOpen, onClose }) => {
  const { availableRoles, getRoleDisplayName } = useRoles();
  const { changeRole } = useUserActions();

  const initialRole = (user.roles[0] || 'Manager') as Role;
  const [selectedRole, setSelectedRole] = useState<Role>(initialRole);
  const [isSubmitting, setIsSubmitting] = useState(false);

  //This one is to reset selection whenever modal re‑opens
  useEffect(() => {
    if (isOpen) setSelectedRole(initialRole);
  }, [isOpen, initialRole]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === initialRole) {
      onClose();
      return;
    }

    setIsSubmitting(true);
    try {
     await changeRole(user.id, selectedRole);
        toast.success(`Role changed to ${getRoleDisplayName(selectedRole)}`);
        onClose();
    } catch (err) {
      console.error(err);
      toast.error('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change role for {user.name}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div>
            <p className="text-sm">
              Current role: <strong>{getRoleDisplayName(initialRole)}</strong>
            </p>
            <RadioGroup
              value={selectedRole}
              onValueChange={(v) => setSelectedRole(v as Role)}
              className="flex flex-col space-y-3 mt-2"
            >
              {availableRoles.map((role) => (
                <label key={role} className="flex items-center space-x-2">
                  <RadioGroupItem value={role} id={`role-${role}`} />
                  <span className="text-sm">{getRoleDisplayName(role)}</span>
                </label>
              ))}
            </RadioGroup>
          </div>

          {selectedRole !== initialRole && (
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-sm font-medium mb-2">
                Permissions for {getRoleDisplayName(selectedRole)}:
              </p>
              <ul className="text-xs list-disc list-inside space-y-1">
                {ROLE_PERMISSIONS[selectedRole].map((perm) => (
                  <li key={perm}>{perm}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <Button className='w-1/2' type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              className='w-1/2'
              disabled={isSubmitting || selectedRole === initialRole}
            >
              {isSubmitting ? 'Updating...' : 'Change Role'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeRoleModal;
