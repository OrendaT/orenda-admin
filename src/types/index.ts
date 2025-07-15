import { IconType } from 'react-icons/lib';
import { JSX } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export type UserRole = 'Admin' | 'Provider' | 'Manager';
export type TeamRole = 'Manager' | 'Member';

type FormStatus = 'pending' | 'submitted';

export interface DBUser {
  access_token: string;
  refresh_token?: string;
  user: {
    name: string | null;
    email: string;
    roles: UserRole[];
    teams: string[];
    id: string;
  };
}

export interface Teams {
  Billing?: TeamRole[];
  Communication?: TeamRole[];
  Clinical?: TeamRole[];
  Credentialing?: TeamRole[];
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

export interface CreditCardFormData {
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

  credit_card_csv: string;
  credit_card_exp_date: string;
  credit_card_number: string;
  zip_code: string;

  flag: boolean;

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



export interface UserData {
  id: string;
  name: string;
  email: string;
  roles: string[];
  teams: Record<string, string[]>
  avatar?: string;
  isCurrentUser?: boolean;
}
export interface AllUsersResponse {
  users: UserData[]
}