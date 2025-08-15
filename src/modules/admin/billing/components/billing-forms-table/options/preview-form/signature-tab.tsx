'use client';

import TabItem from '@/components/shared/preview-tab-item';
import { TabsContent } from '@/components/ui/tabs';
import useForm from '@/hooks/queries/use-form';
import { BillingFormData } from '@/types';
import Image from 'next/image';

const SignatureTab = ({ id }: { id: string }) => {
  const { data, isPending } = useForm<BillingFormData>(id);

  if (isPending || !data?.signature) return;

  return (
    <TabsContent value="signature">
      <section>
        <h3 className="preview_heading">Signature:</h3>
        <div className="mb-6 h-40 w-full rounded-md border">
          <Image
            src={data?.signature}
            className="size-full object-contain"
            alt="Patient signature"
            width={520}
            height={320}
          />
        </div>

        <TabItem name="Date Signed" value={data?.signature_date} />
      </section>
    </TabsContent>
  );
};
export default SignatureTab;
