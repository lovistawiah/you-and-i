import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../account/user";

export type Typing = {
  chatId: string;
  typing: "typing...";
} | null;
export interface IUserValue {
  id: string;
  username: string;
  bio: string;
  avatarUrl: string;
}
export interface IUserState {
  value: IUserValue | null;
}

const initialState: IUserState = {
  value: null,
};

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
