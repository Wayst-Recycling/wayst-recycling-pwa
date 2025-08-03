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
