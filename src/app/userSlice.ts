import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserState, UserValue } from "../interface/userSlice";

const initialState: UserState = {
  value: null,
}

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserValue | null>) => {
      state.value = action.payload;
    },
  },
});

export const { setUserInfo } = userReducer.actions;
export default userReducer.reducer;
