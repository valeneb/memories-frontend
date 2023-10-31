import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    connectUser: (state, action) => {
      state.value = action.payload;
    },
    initUser: (state, action) => {
      state.value = {};
    },
  },
});

export const { connectUser, initUser } = userSlice.actions;
export default userSlice.reducer;