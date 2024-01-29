import { configureStore } from "@reduxjs/toolkit";
import chatInfo from "./chatInfoSlice";
import userInfo from "./userInfoSlice";
const store = configureStore({
  reducer: {
    chatInfo,
    userInfo
  },
});

export default store;
