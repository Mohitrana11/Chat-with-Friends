import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInputValue: ''
};

export const userInputSlice = createSlice({
  name: 'userInput',
  initialState,
  reducers: {
    setUserInputValue: (state, action) => {
      state.userInputValue = action.payload; // Correctly sets payload to state
    },
  }
});

export const { setUserInputValue } = userInputSlice.actions;

export const selectUserInputValue = (state) => state.userInput.userInputValue; // Added selector function

export default userInputSlice.reducer;
