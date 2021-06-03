import { createSlice } from '@reduxjs/toolkit';

export const chainSlice = createSlice({
  name: 'chain',
  initialState: {
    whiteList: [],
  },
  reducers: {
    setWhiteList: (state, action) => {
      state.whiteList = action.payload;
    },
  },
});

export const { setWhiteList } = chainSlice.actions;

export default chainSlice.reducer;
