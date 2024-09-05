import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import verifyUser from './verifyUser';


export const store = configureStore({
  reducer: {
    themeKey: themeReducer,
    auth:verifyUser
  },
});
