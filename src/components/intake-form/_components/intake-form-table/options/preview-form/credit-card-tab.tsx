'use client';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import { TabsContent } from '@/components/ui/tabs';
import { CreditCardInfo } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { LuFileLock2 } from 'react-icons/lu';
import { z } from 'zod';
import TabItem from './preview-tab-item';
import useCreditCardInfo from '@/hooks/mutations/use-credit-card-info';

export default function CreditCardTab({ id }: { id: string }) {
  const [data, setData] = useState<CreditCardInfo | null>(null);

  return (
    <TabsContent value="cc_info">
      <section className="~text-sm/base scrollbar-none max-h-[60dvh] overflow-y-auto rounded-2xl border px-4 py-5">
        {data ? (
          <>
            <h2 className="preview_heading">Credit Card Details</h2>

            <div className="space-y-3">
              <TabItem
                name="Credit card number"
                value={data.credit_card_number}
              />
              <TabItem name="CVV" value={data.credit_card_csv} />
              <TabItem name="Zip code" value={data.billing_zip_code} />
              <TabItem name="Expiry date" value={data.credit_card_exp_date} />
            </div>
          </>
        ) : (
          <EnterPassword id={id} setData={setData} />
        )}
      </section>
    </TabsContent>
  );
}

const PasswordSchema = z.object({
  password: z.string().min(1, { message: 'Password is required' }),
});

const EnterPassword = ({
  id,
  setData,
}: {
  id: string;
  setData: Dispatch<SetStateAction<CreditCardInfo | null>>;
}) => {
  const { mutateAsync: getCreditCardInfo, isPending } = useCreditCardInfo();
  const methods = useForm({
    defaultValues: {
      password: '',
    },
    mode: 'onChange',
    resolver: zodResolver(PasswordSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const res = await getCreditCardInfo({
      id,
      data: { password: data.password },
    });

    if (res.status === 200) {
      setData(res.data.data);
    }
  });

  return (
    <section>
      <p className="mb-5 flex items-center justify-center gap-2 text-sm font-medium">
        <LuFileLock2 className="size-6 shrink-0" />
        This content is protected. Enter the password below to unlock and view
        it
      </p>

      <FormProvider {...methods}>
        <form className="space-y-6" onSubmit={onSubmit} noValidate>
          <Input name="password" type="password" label="Password" />

          <Button
            isLoading={isPending}
            className="mx-auto max-w-[9.81rem] rounded-lg"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </FormProvider>
    </section>
  );
};
