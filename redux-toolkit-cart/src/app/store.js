import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/Cart/cartSlice';
import logger from 'redux-logger';


export const store = configureStore({
  reducer: {
    cartReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
