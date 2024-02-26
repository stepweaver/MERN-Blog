import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlices';

// Create a store with the authReducer
export const store = configureStore({
  reducer: {
    auth: authReducer
  }
});
