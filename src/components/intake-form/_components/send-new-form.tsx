'use client';

import Input from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Status } from '@/types';
import { LuCheck, LuCopy } from 'react-icons/lu';
import { useClipboard } from '@/hooks/use-clipboard';
import { sendNewFormEmail } from '@/services/email-service'; // Updated import

const url = 'https://orenda-intake.vercel.app/';

const SendNewFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  firstName: z.string().optional(),
});

export default function SendNewForm({
  setStatus,
}: {
  setStatus: Dispatch<SetStateAction<Status>>;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const methods = useForm({
    defaultValues: {
      email: '',
      firstName: '',
    },
    resolver: zodResolver(SendNewFormSchema),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const result = await sendNewFormEmail(
        data.email, 
        url,
        data.firstName || undefined
      );
      
      if (result.success) {
        setStatus('success');
        reset(); // Clear the form
      } else {
        const errorMessage = result.error instanceof Error 
          ? result.error.message 
          : String(result.error) || 'Failed to send the form invitation. Please try again.';
        setSubmitError(errorMessage);
        setStatus('danger');
      }
    } catch (error) {
      console.error('Error in form submission:', error);
      setSubmitError('An unexpected error occurred. Please try again.');
      setStatus('danger');
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="mt-8" noValidate>
        <Input
          label="URL link"
          name="url_link"
          value={url}
          className="mb-6"
          readOnly
          tabIndex={-1}
          afterEl={<CopyButton text={url} />}
        />
        
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
          className="mb-10"
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
          {isSubmitting ? 'Sending...' : 'Send Form'}
        </Button>
      </form>
    </FormProvider>
  );
}

const CopyButton = ({ text }: { text: string }) => {
  const [copied, onClick] = useClipboard(text);

  return (
    <Button
      className="text-orenda-purple hover:bg-inherit border-0"
      variant="ghost"
      size="icon"
      type="button"
      onClick={onClick}
      tabIndex={-1}
    >
      {copied ? <LuCheck /> : <LuCopy />}
    </Button>
  );
};