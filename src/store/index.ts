import { configureStore } from '@reduxjs/toolkit';
import ratesReducer from './rates-slice';
import middleware from './middleware';

const store = configureStore({
  reducer: {
    rates: ratesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;