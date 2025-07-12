import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  REGISTER_EMAIL_KEY,
  REGISTER_PASSWORD_KEY,
  REGISTER_PHONE_KEY,
} from '@/actions/auth/auth-constants.server';

import { REGISTER_REDUCER_PATH } from './constants';

const initialState = {
  registerValues: {
    [REGISTER_EMAIL_KEY]: '',
    [REGISTER_PHONE_KEY]: '',
    [REGISTER_PASSWORD_KEY]: '',
    stage: 'verification',
  },
};

export type RegisterValuesType = {
  [REGISTER_EMAIL_KEY]: string;
  [REGISTER_PHONE_KEY]: string;
  [REGISTER_PASSWORD_KEY]: string;
  stage: 'email' | 'bio' | 'verification';
};

type RegisterSliceState = {
  registerValues: RegisterValuesType;
};

export const registerSlice = createSlice({
  name: REGISTER_REDUCER_PATH,
  initialState,
  reducers: {
    updateRegisterValues: (
      state,
      action: PayloadAction<Partial<RegisterSliceState>>,
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    updateRegisterStage: (
      state,
      action: PayloadAction<RegisterValuesType['stage']>,
    ) => {
      state.registerValues.stage = action.payload;
    },

    resetRegisterSlice: () => {
      return initialState;
    },
  },
});

export const { resetRegisterSlice, updateRegisterValues, updateRegisterStage } =
  registerSlice.actions;

export const registerReducer = registerSlice.reducer;
