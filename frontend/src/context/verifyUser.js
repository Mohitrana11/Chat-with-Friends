import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: localStorage.getItem('UserInfo') ? JSON.parse(localStorage.getItem('UserInfo')) : null,
  isLoggedIn: localStorage.getItem('UserInfo') ? true : false,
};

export const verifyUser = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    authUser(state, action) {
      state.value = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('UserInfo', JSON.stringify(action.payload));
    },
    unauthUser(state) {
      state.value = null;
      state.isLoggedIn = false;
      localStorage.removeItem('UserInfo');
    },
    updateUserInfo(state, action) {
      state.value = { ...state.value, ...action.payload };
      localStorage.setItem('UserInfo', JSON.stringify(state.value));
    }
  },
});

export const { authUser, unauthUser, updateUserInfo } = verifyUser.actions;
export default verifyUser.reducer;