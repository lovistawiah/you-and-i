import { configureStore } from "@reduxjs/toolkit";
import chatInfo from "./chatInfoSlice";
const store = configureStore({
  reducer: {
    chatInfo,
  },
});

export default store;
