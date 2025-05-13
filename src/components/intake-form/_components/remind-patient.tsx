'use client';

import Input from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Status } from '@/types';
import { sendReminderEmail } from '@/services/email-service';

const url = 'https://orenda-intake.vercel.app/';

const RemindPatientSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  first_name: z.string().optional(),
});

const RemindPatient = ({
  setStatus,
}: {
  setStatus: Dispatch<SetStateAction<Status>>;
}) => {
  const methods = useForm({
    defaultValues: {
      email: '',
      first_name: '',
    },
    resolver: zodResolver(RemindPatientSchema),
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const { email, first_name } = data;

    // Using the email service instead of directly calling Mail chimp
    const res = await sendReminderEmail({
      email,
      url,
      first_name,
    });

    if (res.success) {
      setStatus('success');
      reset(); // Clear the form
    } else {
      const errorMessage = res.error || 'Failed. Please try again.';
      setError('root', { message: errorMessage });
      console.error('Error in form submission:', errorMessage);
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="mt-8 space-y-6" noValidate>
        <Input
          label={
            <>
              Patient&apos;s First Name <small>(optional)</small>
            </>
          }
          name="first_name"
          placeholder="Enter patient's first name"
        />

        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Enter email"
        />

        {errors.root && (
          <p className="error_message ps-2 !-mt-2 mb-6">{errors.root.message}</p>
        )}

        <Button
          type="submit"
          className="mx-auto max-w-[25rem] rounded-lg"
          isLoading={isSubmitting}
        >
          {isSubmitting ? 'Sending' : 'Send Reminder'}
        </Button>
      </form>
    </FormProvider>
  );
};

export default RemindPatient;
