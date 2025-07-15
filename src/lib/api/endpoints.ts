const BASE = {
  AUTH: 'auth',
  ADMIN: 'admin',
  FORMS: 'patients',
  CREDIT_CARDS: 'credit-cards',
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
  ALL_FORMS: BASE.FORMS,
  EXPORT: `${BASE.FORMS}/export`,
  FORM: (id: string) => `${BASE.FORMS}/${id}`,
  FLAG: (id: string) => `${BASE.FORMS}/${id}/flag`,
  CREDIT_CARD: (id: string) => `${BASE.FORMS}/${id}/credit-card`,
  MASS_DOWNLOAD: `${BASE.FORMS}/mass-download`,
  CHECK_TASK: (id?: string) => `${BASE.ADMIN}/check-task/${id}`,
  DOWNLOAD: (id: string) => `${BASE.ADMIN}/download/DOWNLOADS/${id}.zip`,
  DOWNLOAD_FORM: (id: string) => `${BASE.ADMIN}/download/intake-form/${id}`,
};

export const USERS_EP = {
  ALL_USERS: `${BASE.ADMIN}/users`
}

export const CREDIT_CARD_FORMS_EP = {
  ALL_FORMS: BASE.CREDIT_CARDS,
  CREDIT_CARD: (id: string) => `${BASE.CREDIT_CARDS}/${id}`,
}
