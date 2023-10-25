import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const travelSlice = createSlice({
  name: 'travel',
  initialState,
  reducers: {
    addTravel: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { addTravel } = travelSlice.actions;
export default travelSlice.reducer;