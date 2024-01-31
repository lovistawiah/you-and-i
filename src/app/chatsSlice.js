import { createSlice } from "@reduxjs/toolkit";

export const chatReducer = createSlice({
  name: "chats",
  initialState: {
    chats:[],
  },
  reducers: {
   addChats: (state,action)=>{
    state.chats = action.payload
   },
   updateLastMessage: (state,action)=>{
    const {channelId,lastMessage} = action.payload
    const findIndex = state.chats.findIndex(({channelInfo})=> channelInfo.channelId === channelId)
    if(findIndex !== -1){
      state.chats[findIndex].messageInfo.lastMessage = lastMessage 
    }
   }
  },
});

export const { setChatInfo } = chatReducer.actions;
export default chatReducer.reducer;
