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
    const {channelId,lastMessage,createdAt} = action.payload
    const findIdx = state.chats.findIndex((chat)=> chat.channelId === channelId)
    if(findIdx !== -1){
      state.chats[findIdx].lastMessage = lastMessage
      state.chats[findIdx].createdAt  = createdAt
      state.chats.sort((chatA,chatB)=> new Date(chatB.createdAt) - new Date(chatA.createdAt))
    }
   }
  },
});

export const {addChats,updateLastMessage  } = chatsReducer.actions;
export default chatsReducer.reducer;
