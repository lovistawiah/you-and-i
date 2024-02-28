import { createSlice } from "@reduxjs/toolkit";

export const userReducer = createSlice({
  name: "user",
  initialState: {
    value: null,
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUserInfo } = userReducer.actions;
export default userReducer.reducer;
