// components/AdminsPermissions/InviteUserModal.tsx

'use client';

import React, { useState } from 'react';
import { useUsers } from '@/hooks/useUsers';
import { useRoles } from '@/hooks/useRoles';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import { FormProvider, useForm } from 'react-hook-form'; 
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import InviteSuccessModal from './InviteSuccessModal';
import { InviteUserPayload, Role, ROLE_PERMISSIONS } from '@/types/user';

interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const InviteUserModal: React.FC<InviteUserModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { inviteUser } = useUsers();
  // Removed unused usePermissions hook entirely since it's not being used
  const { availableRoles, getRoleDisplayName } = useRoles();
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<Role | ''>('');

  // Initialize react-hook-form
  const methods = useForm<InviteUserPayload>({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      role: '' as Role,
      note: ''
    }
  });

  const { handleSubmit, watch, setValue, reset } = methods;
  const watchedRole = watch('role');

  const handleRoleChange = (value: string) => {
    setValue('role', value as Role);
    setSelectedRole(value as Role);
  };

  const onSubmit = async (data: InviteUserPayload) => {
    setIsSubmitting(true);
    
    try {
      await inviteUser(data);
      setShowSuccessModal(true);
      reset();
      setSelectedRole('');
    } catch (error) {
      console.error('Failed to invite user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    onSuccess();
  };

  const handleClose = () => {
    reset();
    setSelectedRole('');
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Invite new user</DialogTitle>
          </DialogHeader>
          
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  name="first_name"
                  label="First name"
                  placeholder="enter user first name"
                />
                
                <Input
                  name="last_name"
                  label="Last name"
                  placeholder="enter user last name"
                />
              </div>
              
              <Input
                name="email"
                type="email"
                label="Email address"
                placeholder="enter user email"
              />
              
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Select role for user
                </label>
                <RadioGroup 
                  value={watchedRole || selectedRole} 
                  onValueChange={handleRoleChange}
                  className="flex space-x-6"
                >
                  {availableRoles.map(role => (
                    <div key={role} className="flex items-center space-x-2">
                      <RadioGroupItem value={role} id={`role-${role}`} />
                      <label htmlFor={`role-${role}`} className="text-sm">
                        {getRoleDisplayName(role)}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              {/* Display the permissions associated with the selected role */}
              {(watchedRole || selectedRole) && (
                <div className="p-3 bg-gray-50 rounded-md">
                  <p className="text-sm font-medium text-gray-700 mb-2">Access control for this role:</p>
                  <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                    {ROLE_PERMISSIONS[(watchedRole || selectedRole) as Role]?.map(permission => (
                      <li key={permission}>{permission}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Add Note <span className="text-gray-500">(Optional)</span>
                </label>
                <textarea
                  {...methods.register('note')}
                  className="w-full rounded-lg px-4 py-2.5 outline outline-[#E7E7E7] text-sm resize-none"
                  placeholder="Type here..."
                  rows={4}
                />
              </div>
              
              <div className="mt-6">
                <Button 
                  type="submit" 
                  className="w-full bg-[#2e0086] hover:bg-[#25006d] text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Invite'}
                </Button>
              </div>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
      
      {showSuccessModal && (
        <InviteSuccessModal 
          isOpen={showSuccessModal} 
          onClose={handleSuccessModalClose} 
          email={methods.getValues('email')}
        />
      )}
    </>
  );
};

export default InviteUserModal;