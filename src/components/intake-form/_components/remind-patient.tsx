'use client';

import Input from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import Textarea from '@/components/ui/textarea';
import { Status } from '@/types';
import { sendReminderEmail } from '@/utils/mailchimp';

const url = 'https://orenda-intake.vercel.app/';

const RemindPatientSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  firstName: z.string().optional(),
  message: z
    .string()
    .max(500, { message: 'Message must be less than 500 characters' })
    .optional(),
});

const RemindPatient = ({
  setStatus,
}: {
  setStatus: Dispatch<SetStateAction<Status>>;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const methods = useForm({
    defaultValues: {
      email: '',
      firstName: '',
      message: '',
    },
    resolver: zodResolver(RemindPatientSchema),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const result = await sendReminderEmail(
        data.email,
        url,
        data.firstName || undefined,
        data.message || undefined
      );
      
      if (result.success) {
        setStatus('success');
        reset(); // Clear the form
      } else {
        const errorMessage = result.error instanceof Error 
          ? result.error.message 
          : 'Failed to send the reminder. Please try again.';
        setSubmitError(errorMessage);
        setStatus('danger'); // Use 'danger' instead of 'error'
      }
    } catch (error) {
      console.error('Error in form submission:', error);
      setSubmitError('An unexpected error occurred. Please try again.');
      setStatus('danger'); // Use 'danger' instead of 'error'
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="mt-8" noValidate>
        <Input
          label="Patient's First Name (optional)"
          name="firstName"
          type="text"
          placeholder="Enter patient's first name"
          className="mb-6"
        />
        
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Enter email"
          className="mb-6"
        />

        <Textarea
          label="Custom Message (optional)"
          name="message"
          placeholder="Write a custom message (leave blank to use default reminder text)"
          maxLength={500}
          rows={5}
          showCount
          className="mb-10"
          style={{ maxHeight: '16rem' }}
        />

        {submitError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {submitError}
          </div>
        )}

        <Button 
          type="submit" 
          className="mx-auto max-w-[25rem] rounded-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Reminder'}
        </Button>
      </form>
    </FormProvider>
  );
};

export default RemindPatient;