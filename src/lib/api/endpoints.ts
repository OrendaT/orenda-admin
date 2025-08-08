import { FormType } from '@/types';

const BASE = {
  AUTH: 'auth',
  ADMIN: 'admin',
  INTAKE: 'patients',
  BILLING: 'credit-cards',
};

// auth
export const AUTH_EP = {
  LOGIN: BASE.AUTH,
  LOGIN_GOOGLE: `${BASE.AUTH}/google`,
  REGISTER: `${BASE.AUTH}/register`,
  REGISTER_GOOGLE: `${BASE.AUTH}/register/google`,
  LOGOUT: `${BASE.AUTH}/logout`,
  REFRESH: `${BASE.AUTH}/token/refresh`,
  RESET_PASSWORD_REQUEST: `${BASE.AUTH}/reset-password-request`,
  RESET_PASSWORD: `${BASE.AUTH}/reset-password`,
  STATUS: `${BASE.AUTH}/status`,
};

export const INTAKE_FORMS_EP = {
  ALL_FORMS: BASE.INTAKE,
  EXPORT: `${BASE.INTAKE}/export`,
  FORM: (id: string) => `${BASE.INTAKE}/${id}`,
  FLAG: (id: string) => `${BASE.INTAKE}/${id}/flag`,
  CREDIT_CARD: (id: string) => `${BASE.INTAKE}/${id}/credit-card`,
  MASS_DOWNLOAD: `${BASE.INTAKE}/mass-download`,
  CHECK_TASK: (id?: string) => `${BASE.ADMIN}/check-task/${id}`,
  DOWNLOAD: (id: string) => `${BASE.ADMIN}/download/DOWNLOADS/${id}.zip`,
  DOWNLOAD_FORM: (id: string) => `${BASE.ADMIN}/download/intake-form/${id}`,
};

export const BILLING_FORMS_EP = {
  ALL_FORMS: BASE.BILLING,
  FORM: (id: string) => `${BASE.BILLING}/${id}`,
  FLAG: (id: string) => `${BASE.BILLING}/${id}/flag`,
  CREDIT_CARD: (id: string) => `${BASE.BILLING}/${id}/preview`,
  DOWNLOAD_FORM: (id: string) => `${BASE.ADMIN}/download/credit-card/${id}`,
  EXPORT: `${BASE.BILLING}/export`,
  MASS_DOWNLOAD: `${BASE.BILLING}/mass-download`,
  CHECK_TASK: (id?: string) => id,
};

export const getEP = ({ type }: { type: FormType }) => {
  switch (type) {
    case 'intake':
      return INTAKE_FORMS_EP;
    case 'billing':
      return BILLING_FORMS_EP;
    default:
      return INTAKE_FORMS_EP;
  }
};
