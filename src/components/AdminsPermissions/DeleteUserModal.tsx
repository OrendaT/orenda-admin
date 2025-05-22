// components/AdminsPermissions/DeleteUserModal.tsx

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X, AlertTriangle } from 'lucide-react';
import { User } from '@/types/user';
import useUserActions from '@/hooks/useUserActions'; // Import your existing hook

interface DeleteUserModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ user, isOpen, onClose }) => {
  const { deleteUser } = useUserActions(); // Use your existing hook
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    
    try {
      const result = await deleteUser(user.id);
      if (result.success) {
        onClose();
      } else {
        alert('Failed to delete user. Please try again.');
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
      alert('Failed to delete user. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-red-600">
            Delete User
          </DialogTitle>
          
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                Are you sure you want to delete this user?
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <strong>{user.first_name} {user.last_name}</strong> ({user.email})
              </p>
              <p className="text-sm text-gray-600 mt-2">
                This action cannot be undone. The user will lose access to the system immediately.
              </p>
            </div>
          </div>
          
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
              type="button" 
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete User'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserModal;
