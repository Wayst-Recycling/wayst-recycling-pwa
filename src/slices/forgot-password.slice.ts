import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FORGOT_PASSWORD_REDUCER_PATH } from './constants';

const initialState = {
  forgotPasswordValues: {
    email: '',
    token: '',
  },
  stage: 'email' as ForgotPasswordStageType,
};

export type ForgotPasswordValuesType = {
  email: string;
  token: string;
};

type ForgotPasswordStageType = 'email' | 'confirmation' | 'password';

export const forgotPasswordSlice = createSlice({
  name: FORGOT_PASSWORD_REDUCER_PATH,
  initialState,
  reducers: {
    updateForgotPassword: (
      state,
      action: PayloadAction<Partial<ForgotPasswordValuesType>>,
    ) => {
      state.forgotPasswordValues = {
        ...state.forgotPasswordValues,
        ...action.payload,
      };
    },

    updateForgotPasswordStage: (
      state,
      action: PayloadAction<Partial<ForgotPasswordStageType>>,
    ) => {
      state.stage = action.payload;
    },

    resetForgotPasswordState: () => {
      return initialState;
    },
  },
});

export const {
  resetForgotPasswordState,
  updateForgotPassword,
  updateForgotPasswordStage,
} = forgotPasswordSlice.actions;

export const forgotPasswordReducer = forgotPasswordSlice.reducer;
