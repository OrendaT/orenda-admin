'use client';

import Input from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import Textarea from '@/components/ui/textarea';
import { Status } from '@/types';

const RemindPatientSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  message: z
    .string()
    .min(1, { message: 'This field is required' })
    .max(500, { message: 'Message must be less than 50 characters' }),
});

const RemindPatient = ({
  setStatus,
}: {
  setStatus: Dispatch<SetStateAction<Status>>;
}) => {
  const methods = useForm({
    defaultValues: {
      email: '',
      message: '',
    },
    resolver: zodResolver(RemindPatientSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    setStatus('success');
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="mt-8" noValidate>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Enter email"
          className="mb-6"
        />

        <Textarea
          label="Message"
          name="message"
          placeholder="Write your message"
          maxLength={500}
          rows={5}
          showCount
          className="mb-10"
          style={{ maxHeight: '16rem' }}
        />

        <Button type="submit" className="mx-auto max-w-[25rem] rounded-lg">
          Send Reminder
        </Button>
      </form>
    </FormProvider>
  );
};
export default RemindPatient;
