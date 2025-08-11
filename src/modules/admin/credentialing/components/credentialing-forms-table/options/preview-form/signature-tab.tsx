'use client';

import { TabsContent } from '@/components/ui/tabs';
import useForm from '@/hooks/queries/use-form';
import { CredentialingFormData } from '@/types';
import Image from 'next/image';

const SignatureTab = ({ id }: { id: string }) => {
  const { data, isPending } = useForm<CredentialingFormData>(id);

  if (isPending || !data?.policy_agreement_signature) return;

  return (
    <TabsContent value="signature">
      <section>
        <h3 className="preview_heading">Signature:</h3>
        <div className="mb-6 h-40 w-full rounded-md border">
          <Image
            src={data?.policy_agreement_signature}
            className="size-full object-contain"
            alt="Patient signature"
            width={520}
            height={320}
          />
        </div>
      </section>
    </TabsContent>
  );
};
export default SignatureTab;
