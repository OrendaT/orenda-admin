'use client';

import Input from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Status } from '@/types';
import { LuCheck, LuCopy } from 'react-icons/lu';
import { useClipboard } from '@/hooks/use-clipboard';
import { sendNewFormEmail } from '@/services/email-service';
import {
  INTAKE_FORM_URL as intake_url,
  CREDIT_CARD_FORM_URL as cc_url,
} from '@/lib/data';
import useFormType from '@/hooks/use-form-type';

const SendNewFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  first_name: z.string().optional(),
});

export default function SendNewForm({
  setStatus,
}: {
  setStatus: Dispatch<SetStateAction<Status>>;
}) {
  const { type } = useFormType();
  const url = type === 'intake' ? intake_url : cc_url;
  const methods = useForm({
    defaultValues: {
      email: '',
      first_name: '',
    },
    resolver: zodResolver(SendNewFormSchema),
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const { email, first_name } = data;

    const res = await sendNewFormEmail({ email, first_name }, type);

    if (res.success) {
      setStatus('success');
      reset();
    } else {
      const errorMessage = res.error || 'Failed. Please try again.';
      setError('root', { message: errorMessage });
      console.error('Error in form submission:', errorMessage);
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
          label={
            <>
              Patient&apos;s First Name <small>(optional)</small>
            </>
          }
          name="first_name"
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

        {errors.root && (
          <p className="error_message -mt-5 mb-6 ps-2">{errors.root.message}</p>
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
