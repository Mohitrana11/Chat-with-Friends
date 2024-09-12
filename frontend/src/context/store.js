import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import verifyUser from './verifyUser';
import userInputSlice from './userInputSlice';

export const store = configureStore({
  reducer: {
    themeKey: themeReducer,
    auth: verifyUser,
    userInput: userInputSlice,
  },
});