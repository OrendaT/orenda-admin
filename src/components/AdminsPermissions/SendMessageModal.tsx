// components/AdminsPermissions/SendMessageModal.tsx

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import Textarea from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { User } from '@/types/user';
import { FormProvider, useForm } from 'react-hook-form';
import useUserActions from '@/hooks/useUserActions'; // Import your existing hook

interface SendMessageModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

interface MessageFormData {
  subject: string;
  message: string;
}

const SendMessageModal: React.FC<SendMessageModalProps> = ({ user, isOpen, onClose }) => {
  const { sendMessage } = useUserActions(); // Use your existing hook
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<MessageFormData>({
    defaultValues: {
      subject: '',
      message: ''
    }
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: MessageFormData) => {
    setIsSubmitting(true);
    
    try {
      const result = await sendMessage(user.id, data.subject, data.message);
      if (result.success) {
        alert(`Message sent to ${user.first_name} ${user.last_name}!`);
        methods.reset();
        onClose();
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Send Message to {user.first_name} {user.last_name}
          </DialogTitle>
          
        </DialogHeader>
        
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                To: <strong>{user.email}</strong>
              </p>
            </div>
            
            <Input
              name="subject"
              label="Subject"
              placeholder="Enter message subject"
            />
            
            <Textarea
              name="message"
              label="Message"
              placeholder="Type your message here..."
              rows={6}
            />
            
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
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default SendMessageModal;