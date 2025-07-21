import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FORGOT_PASSWORD_REDUCER_PATH } from '@/slices/constants';

const initialState = {
  forgotPasswordValues: {
    stage: 'email',
  },
};

export type forgotPasswordValuesType = {
  stage: 'email' | 'verification';
};

type ForgotPasswordSliceState = {
  forgotPasswordValues: forgotPasswordValuesType;
};

export const forgotPasswordSlice = createSlice({
  name: FORGOT_PASSWORD_REDUCER_PATH,
  initialState,
  reducers: {
    updateForgotPasswordValues: (
      state,
      action: PayloadAction<Partial<ForgotPasswordSliceState>>,
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    updateForgotPasswordStage: (
      state,
      action: PayloadAction<forgotPasswordValuesType['stage']>,
    ) => {
      state.forgotPasswordValues.stage = action.payload;
    },

    resetForgotPasswordSlice: () => {
      return initialState;
    },
  },
});

export const {
  resetForgotPasswordSlice,
  updateForgotPasswordValues,
  updateForgotPasswordStage,
} = forgotPasswordSlice.actions;

export const forgotPasswordReducer = forgotPasswordSlice.reducer;
