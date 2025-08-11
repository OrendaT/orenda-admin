'use client';

import PreviewFormSkeleton from '@/components/skeletons/preview-form-skeleton';
import { TabsContent } from '@/components/ui/tabs';
import useForm from '@/hooks/queries/use-form';
import TabItem from '@/components/shared/preview-tab-item';
import { CredentialingFormData } from '@/types';

const GeneralTab = ({ id }: { id: string }) => {
  const { data, isPending } = useForm<CredentialingFormData>(id);

  return (
    <TabsContent value="general">
      <section className="~text-sm/base scrollbar-w-1.5 scrollbar-none scrollbar max-h-[64dvh] overflow-y-auto rounded-2xl border px-4 py-5">
        {isPending ? (
          <PreviewFormSkeleton />
        ) : (
          <div className="space-y-6">
            <h2 className="preview_heading text-center">
              Part 1: Document Information
            </h2>

            {/*  Personal Details  */}
            <section>
              <h2 className="preview_heading">Personal Information</h2>

              <div className="space-y-3">
                <div className="flex flex-col items-center gap-4 *:w-full sm:flex-row">
                  <TabItem name="Full name" value={data?.name} />
                </div>

                <TabItem name="Date of Birth" value={data?.date_of_birth} />
                <TabItem
                  name="Social security number"
                  value={data?.social_security_number}
                />
                <TabItem name="Email" value={data?.email} />
              </div>
            </section>

            {/*  Address  */}
            <section>
              <h2 className="preview_heading">Address</h2>

              <div className="space-y-3">
                <div className="flex flex-col items-center gap-4 *:w-full sm:flex-row">
                  <TabItem name="Street Address" value={data?.street_address} />
                  <TabItem name="Address 2" value={data?.address_two} />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <TabItem name="City" value={data?.city} />
                  <TabItem name="State" value={data?.state} />
                  <TabItem name="Zip code" value={data?.zip_code} />
                </div>
                <TabItem name="Residence" value={data?.residence} />
              </div>
            </section>

            {/*  CAQH  */}
            {data?.status === 'submitted' && (
              <section>
                <h2 className="preview_heading">CAQH & NPI</h2>

                <div className="space-y-3">
                  <TabItem name="CAQH Number" value={data?.CAQH_number} />
                  <TabItem name="CAQH Username" value={data?.CAQH_username} />
                  <TabItem name="CAQH Password" value={data?.CAQH_password} />
                  <TabItem name="NPI Number" value={data?.NPI_number} />
                </div>
              </section>
            )}

            {/*  Biography  */}
            {data?.status === 'submitted' && (
              <section>
                <h2 className="preview_heading">Biography</h2>

                <TabItem
                  name="Professional statement"
                  value={data?.professional_statement}
                  isFile
                />
                <TabItem name="Headshot 1" value={data?.headshot_1} isFile />
                <TabItem name="Headshot 2" value={data?.headshot_2} isFile />
              </section>
            )}

            {/*  Other Info  */}
            {data?.status === 'submitted' && (
              <section>
                <h2 className="preview_heading">Other Information</h2>
                <div className="space-y-3">
                  <TabItem
                    name="Referral Source"
                    value={data?.referral_source}
                  />
                  <TabItem
                    name="Referral Source Detail"
                    value={data?.referral_source_detail}
                  />
                  <TabItem
                    name="Primary State of License"
                    value={data?.primary_state_of_license}
                  />
                  <TabItem
                    name="Primary State of License Details"
                    value={data?.primary_state_of_license_details}
                  />
                  <TabItem
                    name="Collaborating Physician"
                    value={data?.collaborating_physician}
                  />
                  <TabItem
                    name="Collaborating Physician Name"
                    value={data?.collaborating_physician_name}
                  />
                  <TabItem
                    name="Collaborating Physician NPI"
                    value={data?.collaborating_physician_npi}
                  />
                  <TabItem
                    name="Collaborating Physician Email"
                    value={data?.collaborating_physician_email}
                  />
                  <TabItem
                    name="Form 4NP Document"
                    value={data?.form_4NP_doc}
                    isFile
                  />
                  <TabItem
                    name="Consent to create PECOS Account"
                    value={data?.consent_create_pecos_account}
                  />
                  <TabItem name="PECOS Username" value={data?.PECOS_username} />
                  <TabItem name="PECOS Password" value={data?.PECOS_password} />
                  <TabItem name="NPPES Username" value={data?.NPPES_username} />
                  <TabItem name="NPPES Password" value={data?.NPPES_password} />
                  <TabItem
                    name="Patient Medicare ID"
                    value={data?.PTAN_medicare_ID}
                  />
                  <TabItem
                    name="Primary State License Document"
                    value={data?.primary_state_license_doc}
                    isFile
                  />
                  <TabItem
                    name="Primary State DEA Number"
                    value={data?.primary_state_dea_number}
                  />
                  <TabItem
                    name="Primary State DEA Document"
                    value={data?.primary_state_dea_doc}
                    isFile
                  />
                  <TabItem
                    name="Has additional NP Licenses"
                    value={data?.has_additional_np_licenses}
                  />
                  <TabItem
                    name="Additional NP Licenses"
                    value={data?.additional_np_licenses}
                  />
                  <TabItem
                    name="Additional State License Document"
                    value={data?.additional_state_license_doc}
                    isFile
                  />
                  <TabItem
                    name="Has additional DEA Registrations"
                    value={data?.has_additional_dea_registrations}
                  />
                  <TabItem
                    name="Additional DEA Registration"
                    value={data?.additional_dea_reg}
                  />
                  <TabItem
                    name="Additional DEA Document"
                    value={data?.additional_dea_doc}
                    isFile
                  />
                  <TabItem
                    name="PMHN/BC Document"
                    value={data?.pmhnp_bc_doc}
                    isFile
                  />
                  <TabItem
                    name="Has additional qualifications"
                    value={data?.has_additional_qualifications}
                  />
                  <TabItem
                    name="Additional qualifications"
                    value={data?.additional_qualifications}
                  />
                  <TabItem
                    name="Additional qualifications document"
                    value={data?.additional_qualifications_doc}
                    isFile
                  />
                  <TabItem
                    name="Malpractice Insurance Document"
                    value={data?.malpractice_insurance_doc}
                    isFile
                  />
                  <TabItem
                    name="Resume/CV Document"
                    value={data?.resume_cv_doc}
                    isFile
                  />
                  <TabItem
                    name="Highest Nursing Degree"
                    value={data?.highest_nursing_degree}
                  />
                  <TabItem name="Photo ID" value={data?.photo_ID} isFile />
                  <TabItem
                    name="Proof of Address ID"
                    value={data?.proof_of_address_ID}
                    isFile
                  />
                </div>
              </section>
            )}

            {/*  Signatures  */}
            {data?.status === 'submitted' && (
              <>
                <h2 className="preview_heading text-center">
                  Part 2: Provider Questionnaire
                </h2>
                <section>
                  <div className="space-y-3">
                    <TabItem
                      name="Patient Age Groups"
                      value={data?.patient_age_groups}
                    />
                    <TabItem
                      name="Follow-up Duration"
                      value={data?.follow_up_duration}
                    />
                    <TabItem
                      name="Offers therapy session"
                      value={data?.offers_therapy_session}
                    />
                    <TabItem
                      name="Therapy sessions"
                      value={data?.therapy_session}
                    />
                    <TabItem
                      name="Health conditions treated"
                      value={data?.health_conditions_treated}
                    />
                    <TabItem
                      name="Health specialties"
                      value={data?.health_specialties}
                    />
                    <TabItem
                      name="Speaks additional languages"
                      value={data?.speaks_additional_lang}
                    />
                    <TabItem
                      name="Additional languages"
                      value={data?.additional_langs}
                    />
                    <TabItem
                      name="Ketamine assisted therapy"
                      value={data?.ketamine_assisted_therapy}
                    />
                    <TabItem
                      name="Ketamine assisted therapy more info"
                      value={data?.ketamine_assisted_therapy_more_info}
                    />
                    <TabItem
                      name="Race/ethnicity"
                      value={data?.race_ethnicity}
                    />
                    <TabItem
                      name="Therapy preference response"
                      value={data?.therapy_preference_response}
                    />
                    <TabItem
                      name="Therapy policy acknowledgement"
                      value={data?.therapy_policy_acknowledgement}
                    />
                    <TabItem
                      name="Identity details"
                      value={data?.identity_details}
                    />
                  </div>
                </section>
              </>
            )}
          </div>
        )}
      </section>
    </TabsContent>
  );
};

export default GeneralTab;
