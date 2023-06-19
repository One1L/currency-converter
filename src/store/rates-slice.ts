import { createSlice } from '@reduxjs/toolkit';

type RatesSliceState = {
  values: {
    [key: string]: {
      [key: string]: number,
    },
  } | null,
  fetchDateTime: Date | null,
};

const initialState: RatesSliceState = {
  values: null,
  fetchDateTime: null,
};
const ratesSlice = createSlice({
  name: 'rates',
  initialState,
  reducers: {
    setRatesValues: (state, action) => {
      state.values = action.payload;
      state.fetchDateTime = new Date();
    }
  }
});

export default ratesSlice.reducer;
export const { setRatesValues } = ratesSlice.actions;