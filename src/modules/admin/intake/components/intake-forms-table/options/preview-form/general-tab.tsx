'use client';

import TabItem from '@/components/shared/preview-tab-item';
import PreviewFormSkeleton from '@/components/skeletons/preview-form-skeleton';
import { TabsContent } from '@/components/ui/tabs';
import useForm from '@/hooks/queries/use-form';
import { IntakeFormData } from '@/types';

const GeneralTab = ({ id }: { id: string }) => {
  const { data, isPending } = useForm<IntakeFormData>(id);

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
                <div className="flex flex-col items-center gap-4 *:w-full sm:flex-row">
                  <TabItem name="First name" value={data?.first_name} />
                  <TabItem name="Last name" value={data?.last_name} />
                </div>

                <TabItem name="Preferred Name" value={data?.preferred_name} />
                <TabItem name="Date of Birth" value={data?.date_of_birth} />
                <TabItem name="Email" value={data?.email} />
                <TabItem name="Phone" value={data?.phone} />

                <div className="flex flex-col items-center gap-4 *:w-full sm:flex-row">
                  <TabItem name="Gender" value={data?.gender} />
                  <TabItem
                    name="Sex assigned at birth"
                    value={data?.sex_assigned_at_birth}
                  />
                </div>
                
                <TabItem name="Race" value={data?.race} />

                <div className="flex flex-col items-center gap-4 *:w-full sm:flex-row">
                  <TabItem name="Address 1" value={data?.address_one} />
                  <TabItem name="Address 2" value={data?.address_two} />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <TabItem name="City" value={data?.city} />
                  <TabItem name="State" value={data?.state} />
                  <TabItem name="Zip code" value={data?.zip_code} />
                </div>

                <TabItem
                  name="Same address for appointment?"
                  value={data?.appointment_address}
                />
                <div className="flex flex-col items-center gap-4 *:w-full sm:flex-row">
                  <TabItem
                    name="Appointment City"
                    value={data?.appointment_city}
                  />
                  <TabItem
                    name="Appointment State"
                    value={data?.appointment_state}
                  />
                </div>

                <TabItem
                  name="Appointment for a minor child:"
                  value={data?.for_minor_child}
                />
                <div className="flex flex-col items-center gap-4 *:w-full sm:flex-row">
                  <TabItem name="Guardian name" value={data?.guardian_name} />
                  <TabItem
                    name="Relationship to child"
                    value={data?.relationship_with_child}
                  />
                </div>
              </div>
            </section>

            {/*  Patient Info & History  */}
            {data?.status === 'submitted' && (
              <section>
                <h2 className="preview_heading">Patient Info & History</h2>

                <div className="space-y-3">
                  <TabItem
                    name="Reason for visit"
                    value={data?.reason_for_visit}
                  />
                  <TabItem
                    name="What would you like your sessions to focus on?"
                    value={data?.mental_health_care_type}
                  />
                  <TabItem
                    name="Seen mental health professional"
                    value={data?.seen_health_professional}
                  />
                  <TabItem
                    name="Symptoms experienced in the past six months"
                    value={data?.symptoms_past_six_months}
                  />
                  <TabItem
                    name="Symptoms experienced in the past six months (other)"
                    value={data?.symptoms_past_six_months_other}
                  />
                  <TabItem
                    name="Current medications and supplements being used"
                    value={data?.current_medications}
                  />
                  <TabItem
                    name="Medical allergies"
                    value={data?.medication_allergies}
                  />
                  <TabItem
                    name="Frequency of alcohol consumption"
                    value={data?.alcohol_frequency}
                  />
                  <TabItem
                    name="Drinks typically had in one sitting"
                    value={data?.alcohol_quantity}
                  />
                  <TabItem
                    name="Recreational drug use, amount and frequency"
                    value={data?.recreational_drug_use}
                  />
                  <TabItem
                    name="Has been previously hospitalized for a psychiatric issue"
                    value={data?.hospitalized_psych}
                  />
                  <TabItem
                    name="Family history of mental illness"
                    value={data?.family_history_mental_illness}
                  />
                  <TabItem
                    name="Personal medical history"
                    value={data?.personal_medical_history}
                  />
                  <TabItem
                    name="Personal medical history (other)"
                    value={data?.personal_medical_history_other}
                  />
                  <TabItem name="Current weight" value={data?.weight} />
                  <TabItem name="Current height" value={data?.height} />
                  <TabItem
                    name="Pregnant or breastfeeding"
                    value={data?.pregnant_or_breastfeeding}
                  />
                  <TabItem
                    name="Had a physical in the last two years"
                    value={data?.recent_physical_exam}
                  />
                  <TabItem
                    name="Relationship status"
                    value={data?.relationship_status}
                  />
                  <TabItem
                    name="Level of education"
                    value={data?.education_level}
                  />
                  <TabItem
                    name="Current occupation details"
                    value={data?.current_occupation}
                  />
                  <TabItem
                    name="Current living situation"
                    value={data?.living_situation}
                  />
                  <TabItem
                    name="Weapons or gun at home"
                    value={data?.has_weapons}
                  />
                  <TabItem
                    name="Hearing impairments"
                    value={data?.hearing_impairment}
                  />
                  <TabItem
                    name="Emergency contact information"
                    value={data?.emergency_contact_info}
                  />
                  <TabItem
                    name="Emergency contact phone"
                    value={data?.emergency_contact_phone}
                  />
                </div>
              </section>
            )}

            {/*  Insurance Details  */}
            {data?.status === 'submitted' && (
              <section>
                <h2 className="preview_heading">Insurance Details</h2>

                <TabItem
                  name="Insurance member ID"
                  value={data?.insurance_id}
                />
                <TabItem
                  name="Insurance provider"
                  value={data?.insurance_provider}
                />
                <TabItem
                  name="Insurance card front"
                  value={data?.insurance_card_front}
                  isFile
                />
                <TabItem
                  name="Insurance card back"
                  value={data?.insurance_card_back}
                  isFile
                />
                <TabItem name="Photo ID" value={data?.photo_ID} isFile />
              </section>
            )}
          </div>
        )}
      </section>
    </TabsContent>
  );
};

export default GeneralTab;
