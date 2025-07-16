import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  REGISTER_DIAL_CODE_KEY,
  REGISTER_EMAIL_KEY,
  REGISTER_FIRST_NAME_KEY,
  REGISTER_LAST_NAME_KEY,
  REGISTER_PASSWORD_KEY,
  REGISTER_PHONE_KEY,
} from '@/actions/auth/auth-constants.server';

import { REGISTER_REDUCER_PATH } from './constants';

const initialState = {
  registerValues: {
    [REGISTER_EMAIL_KEY]: '',
    [REGISTER_PHONE_KEY]: '',
    [REGISTER_PASSWORD_KEY]: '',
    [REGISTER_FIRST_NAME_KEY]: '',
    [REGISTER_LAST_NAME_KEY]: '',
    [REGISTER_DIAL_CODE_KEY]: '+234',
  },
  stage: 'email' as RegisterStageType,
};

export type RegisterValuesType = {
  [REGISTER_EMAIL_KEY]: string;
  [REGISTER_PHONE_KEY]: string;
  [REGISTER_PASSWORD_KEY]: string;
  [REGISTER_FIRST_NAME_KEY]: string;
  [REGISTER_LAST_NAME_KEY]: string;
  [REGISTER_DIAL_CODE_KEY]: string;
};

type RegisterStageType = 'email' | 'bio' | 'verification';

export const registerSlice = createSlice({
  name: REGISTER_REDUCER_PATH,
  initialState,
  reducers: {
    updateRegisterValues: (
      state,
      action: PayloadAction<Partial<RegisterValuesType>>,
    ) => {
      state.registerValues = {
        ...state.registerValues,
        ...action.payload,
      };
    },

    updateRegisterStage: (
      state,
      action: PayloadAction<Partial<RegisterStageType>>,
    ) => {
      state.stage = action.payload;
    },

    resetRegisterSlice: () => {
      return initialState;
    },
  },
});

export const { resetRegisterSlice, updateRegisterValues, updateRegisterStage } =
  registerSlice.actions;

export const registerReducer = registerSlice.reducer;
