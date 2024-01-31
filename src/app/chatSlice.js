import { createSlice } from "@reduxjs/toolkit";

export const chatReducer = createSlice({
  name: "chat",
  initialState: {
    value: null,
  },
  reducers: {
    setChatInfo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setChatInfo } = chatReducer.actions;
export default chatReducer.reducer;
