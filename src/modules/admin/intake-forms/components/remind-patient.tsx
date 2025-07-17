'use client';

import Input from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Status } from '@/types';
import { sendReminderEmail } from '@/services/email-service';
import useFormType from '@/hooks/use-form-type';

const RemindPatientSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  first_name: z.string().optional(),
});

const RemindPatient = ({
  setStatus,
}: {
  setStatus: Dispatch<SetStateAction<Status>>;
}) => {
  const { type } = useFormType();
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

    const res = await sendReminderEmail({ email, first_name }, type);

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

        {/* <Input
          label="Phone Number"
          name="phone"
          type="tel"
          placeholder="Enter phone number"
        /> */}

        {/* <div>
          <h3 className="mb-2 text-sm font-medium">Send via</h3>
          <div className="flex items-center gap-4">
            {options.map(({ label, value }) => (
              <label
                className={cn(
                  'flex cursor-pointer items-center gap-2 rounded-3xl border px-4 py-1.5 text-sm font-medium select-none has-checked:bg-zinc-700 has-checked:text-white',
                )}
                key={value}
              >
                {label}

                {/* Hidden radio input */}
        {/* <input
                  type="checkbox"
                  value={value}
                  hidden
                  {...register('via')}
                />
              </label>
            ))}
          </div> */}
        {/* </div> */}

        {errors.root && (
          <p className="error_message !-mt-2 mb-6 ps-2">
            {errors.root.message}
          </p>
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
