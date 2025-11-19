import {
  CHANGE_PASSWORD_CURRENT_PASSWORD_KEY,
  CHANGE_PASSWORD_NEW_PASSWORD_KEY,
  EDIT_PROFILE_DIAL_CODE_KEY,
  EDIT_PROFILE_PHONE_KEY,
} from '@/actions/user/user-api.constants';

export type IChangePassword = {
  [CHANGE_PASSWORD_CURRENT_PASSWORD_KEY]: string;
  [CHANGE_PASSWORD_NEW_PASSWORD_KEY]: string;
};

export type IEditProfile = {
  [EDIT_PROFILE_PHONE_KEY]: string;
  [EDIT_PROFILE_DIAL_CODE_KEY]: string;
};

export type ICreateDeliveryAddress = {
  address: string;
  region: string;
  city: string;
  state: string;
  long: string;
  lat: string;
};

export type TDeliveryAddress = {
  address: string;
  city: string;
  createdAt: string;
  deletedAt: string;
  id: string;
  lat: string;
  long: string;
  region: string;
  state: string;
  updatedAt: string;
};
