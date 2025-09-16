type FormStatus = 'pending' | 'submitted';

export interface BaseFormData {
  id: string;
  flag: boolean;
  created_at: string;
  updated_at: string;
  status: FormStatus;
}

export interface IntakeFormData extends BaseFormData {
  first_name: string;
  last_name: string;
  preferred_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string;
  race: string;

  address_one: string;
  address_two: string;
  city: string;
  state: string;
  zip_code: string;
  appointment_address: string;
  appointment_city: string;
  appointment_state: string;

  current_occupation: string;
  education_level: string;
  living_situation: string;

  reason_for_visit: string;
  relationship_status: string;
  seen_health_professional: string;
  mental_health_care_type: string;

  current_medications: string;
  medication_allergies: string;

  personal_medical_history: string[];
  personal_medical_history_other: string;
  symptoms_past_six_months: string[];
  symptoms_past_six_months_other: string;

  hospitalized_psych: string;

  alcohol_frequency: string;
  alcohol_quantity: string;
  recreational_drug_use: string;

  pregnant_or_breastfeeding: string;
  has_weapons: string;
  hearing_impairment: string;
  recent_physical_exam: string;

  family_history_mental_illness: string;

  // Signatures and uploads
  guardian_name: string;
  guardian_signature: string;
  relationship_with_child: string;
  for_minor_child: string;

  // insurance
  insurance_id: string;
  insurance_provider: string;
  insurance_card_front: string;
  insurance_card_back: string;
  photo_ID: string;

  honesty: string;
  honesty_signature: string;
  policy_agreement: string;
  policy_agreement_signature: string;

  emergency_contact_info: string;
  emergency_contact_phone: string;

  sex_assigned_at_birth: string;
  height: string;
  weight: string;

  last_accessed_at: string;
}

export interface CreditCardInfo {
  billing_zip_code: string;
  credit_card_csv: string;
  credit_card_exp_date: string;
  credit_card_number: string;
}

export interface BillingFormData extends BaseFormData {
  address_one: string;
  address_two: string;
  cardholder_name: string;
  patient_name: string;
  city: string;
  date_of_birth: string;
  state: string;
  signature: string;
  signature_date: string;
  zip_code: string;

  credit_card_csv: string;
  credit_card_exp_date: string;
  credit_card_number: string;
}

export interface CredentialingFormData extends BaseFormData {
  user_id: string;

  name: string;
  all_names_used: string;
  email: string;
  date_of_birth: string;
  social_security_number: string;
  street_address: string;
  address_two: string;
  city: string;
  state: string;
  zip_code: string;
  residence: string;

  CAQH_number: string;
  CAQH_username: string;
  CAQH_password: string;

  NPI_number: string;
  professional_statement: string;
  headshot_1: string;
  headshot_2: string;

  referral_source: string;
  referral_source_detail: string;

  consent_create_pecos_account: string;
  PECOS_username: string;
  PECOS_password: string;
  NPPES_username: string;
  NPPES_password: string;
  PTAN_medicare_ID: string;

  pmhnp_bc_doc: string;
  has_additional_qualifications: string;
  additional_qualifications: string;
  additional_qualification_docs: string[];

  malpractice_insurance_doc: string;
  resume_cv_doc: string;

  COI_coverage: string;
  COI_coverage_doc: string;

  photo_ID: string;
  proof_of_address_ID: string;
  patient_age_groups: string[];
  health_conditions: Record<string, number>;
  health_specialties: string[];

  speaks_additional_lang: string;
  additional_langs: string[];

  ketamine_assisted_therapy: string;
  ketamine_assisted_therapy_more_info: string;

  race_ethnicity: string;
  race_ethnicity_other?: string;

  therapy_preference_response: string;
  therapy_policy_acknowledgement: string;

  identity_details: string;
  policy_agreement: string;
  policy_agreement_signature: string;

  states_of_license: Record<string, StateLicense>;
  states_of_license_summary: Record<string, StateLicenseSummary>;
  nursing_degrees: Record<string, NursingDegree>;
}

interface StateLicense {
  has_DEA: string;
  DEA_state_doc: string;
  DEA_state_number: string;
  collaborating_physician: string;
  collaborating_physician_name: string;
  collaborating_physician_email: string;
  collaborating_physician_phone: string;
  collaborating_physician_npi: string;
  form_4NP_doc: string;
  state_license_doc: string;
}

interface StateLicenseSummary {
  DEA: string;
  license: string;
  practice_ind: string;
}

interface NursingDegree {
  end_date: string;
  institution: string;
  start_date: string;
}
