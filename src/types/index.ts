import { IconType } from 'react-icons/lib';
import { JSX } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export type UserRole = 'Admin' | 'Provider' | 'Manager';
export type TeamRole = 'Manager' | 'Member';

export type FormType = 'intake' | 'billing' | 'credentialing';
export type URLFormType = 'intake' | 'credit-card' | 'credentialing';

type FormStatus = 'pending' | 'submitted';

export interface DBUser {
  access_token: string;
  refresh_token?: string;
  user: {
    name: string | null;
    email: string;
    roles: UserRole[];
    teams: Teams;
    id: string;
  };
}

export interface Teams {
  Billing?: TeamRole[];
  Communication?: TeamRole[];
  Clinical?: TeamRole[];
  Onboarding?: TeamRole[];
  Intake?: TeamRole[];
}

export interface SidebarMenuItem {
  id: string;
  title: string;
  href?: string;
  Icon?: React.ReactNode;
  className?: string;
  itemClassName?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
  isActive?: boolean;
  items?: SidebarMenuItem[];
  hidden?: boolean;
}

export interface DashboardCardStat {
  name: string;
  value: number;
  percentage: number;
  trend: 'up' | 'down';
  range: string;
  NameIcon: IconType | (() => JSX.Element);
}

export type Status =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export interface IntakeFormData {
  id: string;
  first_name: string;
  last_name: string;
  preferred_name: string;
  email: string;
  phone: string;
  gender: string;
  status: FormStatus;
  type: 'Intake form';
  date_of_birth: string;
  created_at: string;
  updated_at: string;
  flag?: boolean;

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

export interface BillingFormData {
  id: string;
  address_one: string;
  address_two: string;
  cardholder_name: string;
  patient_name: string;
  city: string;
  date_of_birth: string;
  state: string;
  signature: string;
  signature_date: string;
  status: FormStatus;
  zip_code: string;

  credit_card_csv: string;
  credit_card_exp_date: string;
  credit_card_number: string;

  flag: boolean;

  created_at: string;
  updated_at: string;
}

export interface CredentialingFormData {
  id: string;
  name: string;
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

  primary_state_of_license: string;
  primary_state_of_license_details: string;

  collaborating_physician: string;
  collaborating_physician_name: string;
  collaborating_physician_npi: string;
  collaborating_physician_email: string;

  form_4NP_doc: string;
  consent_create_pecos_account: string;

  PECOS_username: string;
  PECOS_password: string;
  NPPES_username: string;
  NPPES_password: string;
  PTAN_medicare_ID: string;

  primary_state_license_doc: string;
  primary_state_dea_number: string;
  primary_state_dea_doc: string;

  has_additional_np_licenses: string;
  additional_np_licenses: string[];
  additional_state_license_doc: string;
  has_additional_dea_registrations: string;
  additional_dea_reg: string;
  additional_dea_doc: string;

  pmhnp_bc_doc: string;
  has_additional_qualifications: string;
  additional_qualifications: string[];
  additional_qualifications_doc: string;

  malpractice_insurance_doc: string;
  resume_cv_doc: string;

  highest_nursing_degree: string;
  photo_ID: string;
  proof_of_address_ID: string;
  patient_age_groups: string;

  follow_up_duration: string;
  offers_therapy_session: string;
  therapy_session: string[];
  health_conditions_treated: string[];
  health_specialties: string[];
  speaks_additional_lang: string;
  additional_langs: string[];
  ketamine_assisted_therapy: string;
  ketamine_assisted_therapy_more_info: string;

  race_ethnicity: string;
  therapy_preference_response: string;
  therapy_policy_acknowledgement: string;

  identity_details: string;

  policy_agreement: string;
  policy_agreement_signature: string;

  flag: boolean;
  status: FormStatus;

  created_at: string;
  updated_at: string;
}

export interface AllFormsResponse<T = unknown> {
  data: T[];
  message: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  success: boolean;
}

export interface UseAllFormsProps {
  url: string;
  page?: string;
  search?: string;
  filters?: {
    flag?: string;
    from?: string;
    to?: string;
    status?: string;
  };
  prefetchNextPages?: boolean;
}

export interface TaskStatusResponse {
  error: boolean | null;
  ready: boolean;
  successful: boolean;
  url: string;
}

// This is the type for the resources in the app-data.ts file
export interface Resource {
  id: string;
  name: string;
  resources: ResourceFolder[] | ResourceFile[];
  title?: SidebarMenuItem['title'];
  Icon: SidebarMenuItem['Icon'];
}

export interface ResourceFolder {
  id: string;
  name: string;
  title?: string;
  resources: ResourceFile[];
  sub_folders?: ResourceFolder[];
}

export interface ResourceFile {
  id?: string;
  name: string;
  url: string;
  image?: string | StaticImport;
}

export type FoundResource = Resource | ResourceFile | ResourceFolder;
