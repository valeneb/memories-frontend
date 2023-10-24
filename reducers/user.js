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
  },
});

export const { connectUser } = userSlice.actions;
export default userSlice.reducer;