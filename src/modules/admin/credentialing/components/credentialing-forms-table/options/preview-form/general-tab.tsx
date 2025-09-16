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

                <TabItem
                  name="All Names Ever Used"
                  value={data?.all_names_used}
                />
                <TabItem name="Date of Birth" value={data?.date_of_birth} />
                <TabItem
                  name="Social security number"
                  value={data?.social_security_number}
                />
                <TabItem name="Email" value={data?.email} />
              </div>
            </section>

            {/*  Address  */}
            {data?.status === 'submitted' && (
              <>
                <section>
                  <h2 className="preview_heading">Address</h2>

                  <div className="space-y-3">
                    <div className="flex flex-col items-center gap-4 *:w-full sm:flex-row">
                      <TabItem
                        name="Street Address"
                        value={data?.street_address}
                      />
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
                <section>
                  <h2 className="preview_heading">CAQH & NPI</h2>

                  <div className="space-y-3">
                    <TabItem name="CAQH Number" value={data?.CAQH_number} />
                    <TabItem name="CAQH Username" value={data?.CAQH_username} />
                    <TabItem name="CAQH Password" value={data?.CAQH_password} />
                    <TabItem name="NPI Number" value={data?.NPI_number} />
                  </div>
                </section>

                {/*  Biography  */}
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

                {/*  States of License Info  */}
                <section>
                  <h2 className="preview_heading mb-0">States of License</h2>
                  <div className="space-y-3">
                    {Object.entries(data.states_of_license).map(
                      ([state, value]) => {
                        return (
                          <div key={state}>
                            <h3 className="mb-2 text-center font-medium underline underline-offset-1">
                              {state}
                            </h3>
                            <div className="space-y-3">
                              <TabItem
                                name="Collaborating Physician Status"
                                value={value?.collaborating_physician}
                              />
                              <TabItem
                                name="Collaborating Physician Name"
                                value={value?.collaborating_physician_name}
                              />
                              <TabItem
                                name="Collaborating Physician Email"
                                value={value?.collaborating_physician_email}
                              />
                              <TabItem
                                name="Collaborating Physician Phone Number"
                                value={value?.collaborating_physician_phone}
                              />
                              <TabItem
                                name="Collaborating Physician NPI"
                                value={value?.collaborating_physician_npi}
                              />
                              <TabItem
                                name="State License Document"
                                value={value?.state_license_doc}
                                isFile
                              />
                              <TabItem
                                name="Form 4NP Document"
                                value={value?.form_4NP_doc}
                                isFile
                              />
                              <TabItem
                                name="Has State DEA?"
                                value={value?.has_DEA}
                              />
                              <TabItem
                                name="State DEA Number"
                                value={value?.DEA_state_number}
                              />
                              <TabItem
                                name="State DEA Document"
                                value={value?.DEA_state_doc}
                                isFile
                              />
                            </div>
                          </div>
                        );
                      },
                    )}

                    <h2 className="preview_heading mb-0">
                      States Of License Summary
                    </h2>
                    {Object.entries(data.states_of_license_summary).map(
                      ([state, value]) => {
                        return (
                          <div key={state}>
                            <h3 className="mb-2 text-center font-medium underline underline-offset-1">
                              {state}
                            </h3>
                            <TabItem name="License" value={value?.license} />
                            <TabItem name="DEA" value={value?.DEA} />
                            <TabItem
                              name="Practice Independently"
                              value={value?.practice_ind}
                            />
                          </div>
                        );
                      },
                    )}
                  </div>
                </section>

                {/*  Identification Requirements  */}
                <section>
                  <h2 className="preview_heading">
                    Identification Requirements
                  </h2>
                  <div className="space-y-3">
                    <TabItem name="Photo ID" value={data?.photo_ID} isFile />
                    <TabItem
                      name="Proof of Address ID"
                      value={data?.proof_of_address_ID}
                      isFile
                    />
                  </div>
                </section>

                {/*  Nursing Degrees  */}
                <section>
                  <h2 className="preview_heading">Nursing Degrees</h2>
                  <div className="space-y-3">
                    {data?.nursing_degrees.values ? (
                      Object.entries(data.nursing_degrees).map(
                        ([degree, value]) => {
                          return (
                            <div key={degree}>
                              <h3 className="mb-2 -mt-2 text-center font-medium underline underline-offset-1">
                                {degree}
                              </h3>
                              <div className="space-y-3">
                                <TabItem
                                  name="Institution"
                                  value={value?.institution}
                                />
                                <TabItem
                                  name="Start Date"
                                  value={value?.start_date}
                                />
                                <TabItem
                                  name="End Date"
                                  value={value?.end_date}
                                />
                              </div>
                            </div>
                          );
                        },
                      )
                    ) : (
                      <p className="preview_data">N/A</p>
                    )}
                  </div>
                </section>

                {/*  Other Info  */}
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
                      name="Consent to create PECOS Account"
                      value={data?.consent_create_pecos_account}
                    />
                    <TabItem
                      name="PECOS Username"
                      value={data?.PECOS_username}
                    />
                    <TabItem
                      name="PECOS Password"
                      value={data?.PECOS_password}
                    />
                    <TabItem
                      name="NPPES Username"
                      value={data?.NPPES_username}
                    />
                    <TabItem
                      name="NPPES Password"
                      value={data?.NPPES_password}
                    />
                    <TabItem
                      name="Patient Medicare ID"
                      value={data?.PTAN_medicare_ID}
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
                      name="Additional qualification document"
                      value={data?.additional_qualification_docs}
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
                      name="Has COI Coverage"
                      value={data?.COI_coverage}
                    />
                    <TabItem
                      name="COI Coverage"
                      value={data?.COI_coverage_doc}
                      isFile
                    />
                  </div>
                </section>

                {/*  Part 2: Provider Questionnaire  */}
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
                      name="Health conditions treated"
                      value={Object.entries(data?.health_conditions).map(
                        ([condition, value]) =>
                          `${condition} (Rating: ${value})`,
                      )}
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
