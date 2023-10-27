import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {
    initDiary: (state, action) => {
      state.value = action.payload;
    },
    addNewDiary: (state, action) => {
        state.value.push(action.payload);
    },
    updateDiary: (state, action) => {
        const updatedDiary = action.payload;
        state.value = state.value.map((diary) =>
            diary._id === updatedDiary._id ? updatedDiary : diary
        );
    },
  },
});

export const { initDiary, addNewDiary, updateDiary } = diarySlice.actions;
export default diarySlice.reducer;