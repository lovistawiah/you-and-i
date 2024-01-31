import { createSlice } from "@reduxjs/toolkit";

export const chatReducer = createSlice({
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

export const { chatInfo } = chatReducer.actions;
export default chatReducer.reducer;
