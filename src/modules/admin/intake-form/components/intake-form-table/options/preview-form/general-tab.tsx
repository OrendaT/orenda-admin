'use client';

import PreviewFormSkeleton from '@/components/skeletons/preview-form-skeleton';
import { TabsContent } from '@/components/ui/tabs';
import useForm from '@/hooks/queries/use-form';
import TabItem from './preview-tab-item';

const GeneralTab = ({ id }: { id: string }) => {
  const { data, isPending } = useForm(id);

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

                <TabItem name="Email" value={data?.email} />
                <TabItem name="Phone" value={data?.phone} />

                <div className="flex flex-col items-center gap-4 *:w-full sm:flex-row">
                  <TabItem name="Gender" value={data?.gender} />
                  <TabItem
                    name="Sex assigned at birth"
                    value={data?.sex_assigned_at_birth}
                  />
                </div>

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
                    name="Mental health care needed"
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
                    name="Has suicidal thoughts?"
                    value={data?.suicidal_thoughts}
                  />
                  <TabItem
                    name="Suicidal thoughts details"
                    value={data?.suicidal_thoughts_details}
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
                  name={
                    <>
                      Insurance card front
                      <a
                        href={data?.insurance_card_front}
                        className="ml-4 inline-block text-xs underline underline-offset-1 text-shadow-blue-900"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download file
                      </a>
                    </>
                  }
                  value={data?.insurance_card_front}
                  isFile
                  altText="Insurance card front"
                />
                <TabItem
                  name={
                    <>
                      Insurance card back
                      <a
                        href={data?.insurance_card_back}
                        className="ml-4 inline-block text-xs underline underline-offset-1 text-shadow-blue-900"
                      >
                        Download file
                      </a>
                    </>
                  }
                  value={data?.insurance_card_back}
                  isFile
                  altText="Insurance card back"
                />
                <TabItem
                  name={
                    <>
                      Photo ID
                      <a
                        href={data?.photo_ID}
                        className="ml-4 inline-block text-xs underline underline-offset-1 text-shadow-blue-900"
                      >
                        Download file
                      </a>
                    </>
                  }
                  value={data?.photo_ID}
                  isFile
                  altText="Photo ID"
                />
              </section>
            )}
          </div>
        )}
      </section>
    </TabsContent>
  );
};

export default GeneralTab;
