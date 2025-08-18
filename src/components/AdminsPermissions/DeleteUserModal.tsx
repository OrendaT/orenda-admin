'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertTriangle } from 'lucide-react';
import { UserData } from '@/types';
import useUserActions from '@/hooks/useUserActions';

interface DeleteUserModalProps {
  user: UserData;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ user, isOpen, onClose }) => {
  const { deleteUser } = useUserActions();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await deleteUser(user.id);
      onClose();
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
          <DialogTitle className="text-lg font-semibold text-red-600">
            Remove Member
          </DialogTitle>

        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="flex items-start space-x-3 mb-3">
            <AlertTriangle className="h-6 w-6 text-red-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                Are you sure?
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <strong>{user.name}</strong> ({user.email})
              </p>
              <p className="text-sm text-gray-600 mt-2">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="w-full h-[0.5px] mt-5 bg-gray-500"></div>

          <div className="flex gap-3 mt-2">
            {/* <Button 
              type="button"  
              className="flex-1 px-1 py-1 bg-white text-black"
              onClick={onClose}
            >
              Cancel
            </Button> */}
            <a href="" onClick={onClose} className="flex-1 px-1 py-3 bg-white text-black">Cancel</a>
            <Button
              type="button"
              className="flex-1 px-[1px] py-[2px] bg-red-600 hover:bg-red-700 text-white"
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
