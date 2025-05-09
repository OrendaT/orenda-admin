const BASE = {
  AUTH: 'auth',
  PATIENTS: 'patients',
};

// auth
export const AUTH_EP = {
  LOGIN: BASE.AUTH,
  REGISTER: `${BASE.AUTH}/register`,
  LOGOUT: `${BASE.AUTH}/logout`,
  REFRESH: `${BASE.AUTH}/token/refresh`,
  RESET_PASSWORD_REQUEST: `${BASE.AUTH}/reset-password-request`,
  RESET_PASSWORD: `${BASE.AUTH}/reset-password`,
  STATUS: `${BASE.AUTH}/status`,
};

export const FORMS_EP = {
  ALL_PATIENTS: BASE.PATIENTS,
  EXPORT: `${BASE.PATIENTS}/export`,
  PATIENT: (id: string) => `${BASE.PATIENTS}/${id}`,
  FLAG: (id: string) => `${BASE.PATIENTS}/${id}/flag`,
  CREDIT_CARD: (id: string) => `${BASE.PATIENTS}/${id}/credit-card`,
  MASS_DOWNLOAD: `${BASE.PATIENTS}/mass-download`,
};
