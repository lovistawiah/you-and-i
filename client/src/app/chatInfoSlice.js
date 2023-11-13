import { createSlice } from "@reduxjs/toolkit";

export const chatInfoSlice = createSlice({
  name: "chat",
  initialState: {
    value: null,
  },
  reducers: {
    chatInfo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { chatInfo } = chatInfoSlice.actions;
export default chatInfoSlice.reducer;
