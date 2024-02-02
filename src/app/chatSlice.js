import { createSlice } from "@reduxjs/toolkit";
import {lastSeen} from '../utils/compareDate'

export const chatReducer = createSlice({
  name: "chat",
  initialState: {
    value: null,
  },
  reducers: {
    setChatInfo: (state, action) => {
      state.value = action.payload;
    },
    updateStatus: (state,action) => {
      const {userId,status} = action.payload
      if(state.value.userId === userId && status){
        state.value.status = lastSeen(status)

      }
    }
  },
});

export const { setChatInfo,updateStatus } = chatReducer.actions;
export default chatReducer.reducer;
