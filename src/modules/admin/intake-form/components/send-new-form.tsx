'use client';

import Input from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { Status } from '@/types';
import { LuCheck, LuCopy } from 'react-icons/lu';
import { RiMailSendLine } from "react-icons/ri";
import { FaRegMessage } from "react-icons/fa6";
import { useClipboard } from '@/hooks/use-clipboard';
import { sendNewFormEmail } from '@/services/email-service';
import { cn } from '@/lib/utils';

const url = 'https://orenda-intake.vercel.app/';

// Define send via options with correct typing
const options = [
  { label: 'Email', value: 'email' as const, icon: RiMailSendLine },
  { label: 'SMS', value: 'sms' as const, icon: FaRegMessage },
];

// Create a dynamic schema based on selected options
const createSendNewFormSchema = (via: string[]) => {
  return z.object({
    first_name: z.string().optional(),
    email: via.includes('email') 
      ? z.string().email({ message: 'Please enter a valid email address' })
      : z.string().optional(),
    phone: via.includes('sms')
      ? z.string().min(10, { message: 'Please enter a valid phone number' })
      : z.string().optional(),
    via: z.array(z.enum(['sms', 'email'])).min(1, { message: 'Select at least one method' }),
  });
};

export default function SendNewForm({
  setStatus,
}: {
  setStatus: Dispatch<SetStateAction<Status>>;
}) {
  const methods = useForm({
    defaultValues: {
      email: '',
      first_name: '',
      phone: '',
      via: ['email'] as ('email' | 'sms')[],
    },
    resolver: zodResolver(createSendNewFormSchema(['email'])),
  });

  const {
    handleSubmit,
    reset,
    setError,
    control,
    clearErrors,
    formState: { errors, isSubmitting },
    register,
    trigger,
  } = methods;

  // Watch for via changes to update schema validation
  const via = useWatch({
    control,
    name: 'via',
    defaultValue: ['email'],
  });

  // Update validation when via changes
  useEffect(() => {
    // Clear errors when switching methods
    clearErrors(['email', 'phone']);
    
    // Re-validate the form with the new schema
    trigger();
  }, [via, clearErrors, trigger]);

  const onSubmit = handleSubmit(async (data) => {
    const { email, first_name, phone, via } = data;

    try {
      let emailResult = { success: true };
      let smsResult = { success: true };
      
      // Create an array of promises to execute
      const promises = [];
      
      // Add email promise if selected
      if (via.includes('email') && email) {
        promises.push(
          sendNewFormEmail({ email, url, first_name })
            .then(result => { emailResult = result; })
        );
      }
      
      // Add SMS promise if selected
      if (via.includes('sms') && phone) {
        promises.push(
          // Replace with your SMS sending function
          fetch('/api/send-sms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              phone,
              message: `Hello ${first_name || ''}. You have a new intake form to complete: ${url}`,
            }),
          })
            .then(res => res.json())
            .then(result => { smsResult = result; })
        );
      }
      
      // Wait for all promises to resolve
      await Promise.all(promises);
      
      // Check if at least one method succeeded
      if (emailResult.success || smsResult.success) {
        setStatus('success');
        reset();
      } else {
        // Handle case where all methods failed
        const errorMessage = 'Failed to send form. Please try again.';
        setError('root', { message: errorMessage });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed. Please try again.';
      setError('root', { message: errorMessage });
      console.error('Error in form submission:', errorMessage);
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="mt-8 space-y-6" noValidate>
        <Input
          label="URL link"
          name="url_link"
          value={url}
          readOnly
          tabIndex={-1}
          afterEl={<CopyButton text={url} />}
        />

        <Input
          label={
            <>
              Patient&apos;s First Name <small>(optional)</small>
            </>
          }
          name="first_name"
          type="text"
          placeholder="Enter patient's first name"
        />

        {/* Send via options */}
        <div>
          <h3 className="mb-2 text-sm font-medium">Send via</h3>
          <div className="flex items-center gap-4 mb-2">
            {options.map(({ label, value, icon: Icon }) => (
              <label
                className={cn(
                  'flex cursor-pointer items-center gap-2 rounded-3xl border px-4 py-1.5 text-sm font-medium select-none transition-colors',
                  via.includes(value)
                    ? 'bg-[#cac7df] text-orenda-purple border-gray-300'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                )}
                key={value}
              >
                <Icon className="h-4 w-4" />
                {label}

                {/* Hidden checkbox input */}
                <input
                  type="checkbox"
                  value={value}
                  hidden
                  {...register('via')}
                />
              </label>
            ))}
          </div>
          {errors.via && (
            <p className="text-red-500 text-xs mt-1">{errors.via.message as string}</p>
          )}
        </div>

        {/* Conditional Email Field */}
        {via.includes('email') && (
          <div className="space-y-1">
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Enter email"
              required={via.includes('email')}
            />
            
          </div>
        )}

        {/* Conditional Phone Field */}
        {via.includes('sms') && (
          <div className="space-y-1">
            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="Enter phone number"
              required={via.includes('sms')}
            />
            {errors.phone ? (
              <p className="text-red-500 text-xs">{errors.phone.message as string}</p>
            ) : (
              <p className="text-gray-500 text-xs">The intake form link will be sent via text message</p>
            )}
          </div>
        )}

        {errors.root && (
          <p className="text-red-500 text-sm px-2">{errors.root.message}</p>
        )}

        <Button
          type="submit"
          className="mx-auto max-w-[25rem] rounded-lg"
          isLoading={isSubmitting}
        >
          {isSubmitting ? 'Sending' : 'Send Form'}
        </Button>
      </form>
    </FormProvider>
  );
}

const CopyButton = ({ text }: { text: string }) => {
  const [copied, onClick] = useClipboard(text);

  return (
    <Button
      className="text-orenda-purple border-0 hover:bg-inherit"
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