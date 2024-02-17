import { createSlice } from "@reduxjs/toolkit";
import {lastSeen} from '../utils/compareDate'

export const chatReducer = createSlice({
  name: "chat",
  initialState: {
    value: null,
  },
  reducers: {
    setChatInfo: (state, action) => {
      state.value = {}
      state.value = action.payload;
    },
    updateStatus: (state,action) => {
      const {userId,status} = action.payload
      if(state.value.userId === userId && status){
        state.value.status = lastSeen(status)
      }
    },
    updateNewChat: (state,action)=>{
      const {chatId,userId} = action.payload

      if(userId){
        if(state.value?.userId === userId && !state.value.chatId){
          state.value.chatId = chatId
        }
      }
    }
  },
});

export const { setChatInfo,updateStatus,updateNewChat } = chatReducer.actions;
export default chatReducer.reducer;
