import {
  REGISTER_DIAL_CODE_KEY,
  REGISTER_EMAIL_KEY,
  REGISTER_FIRST_NAME_KEY,
  REGISTER_LAST_NAME_KEY,
  REGISTER_PASSWORD_KEY,
  REGISTER_PHONE_KEY,
} from '@/actions/auth/auth-constants.server';

export interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string | null;
  region: string | null;
  city: string | null;
  country: string | null;
  phone: string;
  dialCode: string;
  oxAddress: string | null;
  registrationToken: string | null;
  registrationTokenExpires: string | null;
  forgotPasswordToken: string | null;
  forgotPasswordTokenExpires: string | null;
  emailVerifiedAt: string | null;
  phoneVerifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  wallet: {
    address: string;
  };
}

export type RegisterUserInput = {
  [REGISTER_EMAIL_KEY]: string;
  [REGISTER_PHONE_KEY]: string;
  [REGISTER_PASSWORD_KEY]: string;
  [REGISTER_FIRST_NAME_KEY]: string;
  [REGISTER_LAST_NAME_KEY]: string;
  [REGISTER_DIAL_CODE_KEY]: string;
};
