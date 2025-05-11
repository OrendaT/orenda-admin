import { TabsContent } from '@/components/ui/tabs';
import useForm from '@/hooks/queries/use-form';
import { FormData } from '@/types';
import Image from 'next/image';
import { useMemo } from 'react';

export const _signatures: {
  id: keyof FormData;
  name: string;
  value?: string;
}[] = [
  {
    id: 'guardian_signature',
    name: 'Guardian signature',
    value: '',
  },
  {
    id: 'honesty_signature',
    name: 'Honesty signature',
    value: '',
  },
  {
    id: 'medication_history_signature',
    name: 'Medication history signature',
    value: '',
  },
  {
    id: 'informed_consent_signature',
    name: 'Informed consent signature',
    value: '',
  },
  {
    id: 'practice_policies_signature',
    name: 'Practice policies signature',
    value: '',
  },
  {
    id: 'privacy_policy_signature',
    name: 'Privacy policy signature',
    value: '',
  },
  {
    id: 'telehealth_consent_signature',
    name: 'Telehealth consent signature',
    value: '',
  },
];

const SignaturesTab = ({ id }: { id: string }) => {
  const { data, isPending } = useForm(id);

  const signatures = useMemo(() => {
    if (!data) return [];

    return _signatures
      .map((signature) => ({
        ...signature,
        value: data[signature.id]?.toString() ?? '',
      }))
      .filter((signature) => !!signature.value);
  }, [data]);

  if (isPending) return;

  return (
    <TabsContent value="signatures">
      <div className="space-y-6">
        <section>
          <h3 className="preview_heading">Fields signed:</h3>
          <ul className="list-decimal space-y-1 ps-4">
            {signatures.map((signature) => (
              <li className="preview_value" key={signature.id}>
                {signature.name}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="preview_heading">Signature:</h3>
          <div className="h-40 w-full rounded-md border">
            <Image
              src={signatures[0]?.value}
              className="size-full object-contain"
              alt="Patient signature"
              width={520}
              height={320}
            />
          </div>
        </section>
      </div>
    </TabsContent>
  );
};
export default SignaturesTab;
