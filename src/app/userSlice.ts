import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserState, UserValue } from "../interface/app/userSlice";
import { UserInfo } from "../interface/account/user";

const initialState: UserState = {
  value: null,
}

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo | null>) => {
      state.value = action.payload ? action.payload : null;
    },
  },
});

export const { setUserInfo } = userReducer.actions;
export default userReducer.reducer;
