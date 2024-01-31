import { createSlice } from "@reduxjs/toolkit";

export const chatsReducer = createSlice({
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

export const {addChats,updateLastMessage  } = chatsReducer.actions;
export default chatsReducer.reducer;
