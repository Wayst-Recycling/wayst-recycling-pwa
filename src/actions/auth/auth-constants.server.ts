export const LOGIN_PATH = '/auth/login';
export const REGISTER_PATH = '/auth/register';
export const RESEND_VERIFICATION_LINK_PATH = '/auth/resend-verification-code';
export const VERIFY_REGISTRATION_EMAIL_PATH = '/auth/register/verify-email';
export const FORGOT_PASSWORD_PATH = '/auth/forgot-password';
export const RESEND_FORGOT_PASSWORD_LINK_PATH =
  '/auth/forgot-password/resend-code';
export const FORGOT_PASSWORD_CONFIRM_PATH = '/auth/forgot-password/confirm';
export const RESET_PASSWORD_PATH = '/auth/forgot-password/reset';

export const REGISTER_EMAIL_KEY = 'email' as const;
export const REGISTER_PASSWORD_KEY = 'password' as const;
export const REGISTER_FIRST_NAME_KEY = 'firstName' as const;
export const REGISTER_LAST_NAME_KEY = 'lastName' as const;
export const REGISTER_PHONE_KEY = 'phone' as const;
export const REGISTER_DIAL_CODE_KEY = 'dialCode' as const;

export const LOGIN_EMAIL_KEY = 'email';
export const LOGIN_PASSWORD_KEY = 'password';
