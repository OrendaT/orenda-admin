// components/AdminsPermissions/InviteSuccessModal.tsx

import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface InviteSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

const InviteSuccessModal: React.FC<InviteSuccessModalProps> = ({ 
  isOpen, 
  onClose, 
  // email parameter kept in interface but not used in component
  email: string // eslint-disable-line @typescript-eslint/no-unused-vars
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-[#2e0086]" />
          </div>
          
          <h2 className="text-xl font-bold">Invitation sent!</h2>
          
          <p className="text-gray-600">
            Your new user profile will be added once they accept the invite link sent to their email.
          </p>
          
          <Button 
            onClick={onClose}
            className="mt-4 bg-[#2e0086] hover:bg-[#25006d] text-white"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteSuccessModal;