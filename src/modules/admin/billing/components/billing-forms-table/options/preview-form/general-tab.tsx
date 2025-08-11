'use client';

import PreviewFormSkeleton from '@/components/skeletons/preview-form-skeleton';
import { TabsContent } from '@/components/ui/tabs';
import useForm from '@/hooks/queries/use-form';
import TabItem from '@/components/shared/preview-tab-item';
import { BillingFormData } from '@/types';

const GeneralTab = ({ id }: { id: string }) => {
  const { data, isPending } = useForm<BillingFormData>(id);

  return (
    <TabsContent value="general">
      <section className="~text-sm/base scrollbar-w-1.5 scrollbar-none scrollbar max-h-[64dvh] overflow-y-auto rounded-2xl border px-4 py-5">
        {isPending ? (
          <PreviewFormSkeleton />
        ) : (
          <div className="space-y-6">
            {/*  Personal Details  */}
            <section>
              <h2 className="preview_heading">Personal Details</h2>

              <div className="space-y-3">
                <TabItem name="Patient Name" value={data?.patient_name} />
                <TabItem name="Date of Birth" value={data?.date_of_birth} />
                <TabItem name="Cardholder Name" value={data?.cardholder_name} />
              </div>
            </section>

            {/*  Billing Address  */}
            {data?.status === 'submitted' && (
              <section>
                <h2 className="preview_heading">Billing Address</h2>

                <div className="space-y-3">
                  <div className="flex flex-col items-center gap-4 *:w-full sm:flex-row">
                    <TabItem name="Street Address" value={data?.address_one} />
                    <TabItem name="Address -Line 2" value={data?.address_two} />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <TabItem name="City" value={data?.city} />
                    <TabItem name="State" value={data?.state} />
                    <TabItem name="Zip code" value={data?.zip_code} />
                  </div>
                </div>
              </section>
            )}
          </div>
        )}
      </section>
    </TabsContent>
  );
};

export default GeneralTab;
