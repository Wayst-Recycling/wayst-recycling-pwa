import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CURRENCY_REDUCER_PATH } from '@/slices/constants';

const initialState = {
  activeCurrency: 1,
};

export const currencySlice = createSlice({
  name: CURRENCY_REDUCER_PATH,
  initialState,
  reducers: {
    updateActiveCurrency: (state, action: PayloadAction<number>) => {
      state.activeCurrency = action.payload;
    },

    resetCurrencySlice: () => {
      return initialState;
    },
  },
});

export const { resetCurrencySlice, updateActiveCurrency } =
  currencySlice.actions;

export const currencyReducer = currencySlice.reducer;
