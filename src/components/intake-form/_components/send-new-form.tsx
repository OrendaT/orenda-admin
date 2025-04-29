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

const url = 'https://orenda-intake.vercel.app/';

const SendNewFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

export default function SendNewForm({
  setStatus,
}: {
  setStatus: Dispatch<SetStateAction<Status>>;
}) {
  const methods = useForm({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(SendNewFormSchema),
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
          label="URL link"
          name="url_link"
          value={url}
          className="mb-6"
          readOnly
          tabIndex={-1}
          afterEl={<CopyButton text={url} />}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Enter email"
          className="mb-10"
        />

        <Button type="submit" className="mx-auto max-w-[25rem] rounded-lg">
          Send Form
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
