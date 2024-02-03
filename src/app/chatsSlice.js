import { createSlice } from "@reduxjs/toolkit";

export const chatsReducer = createSlice({
  name: "chats",
  initialState: {
    chats:[],
    typingObj: null,
    searchChats: []

  },
  reducers: {
   addChats: (state,action)=>{
    const { payload } = action;
      const chatExists = state.chats.some((chat) => chat.Id=== payload.Id);
      if (!chatExists) {
        state.chats.push(payload);
      }
   },

   updateLastMessage: (state,action)=>{
    const {chatId,lastMessage,msgDate} = action.payload
    const findIdx = state.chats.findIndex((chat)=> chat.Id === chatId)

    if(findIdx !== -1){
      state.chats[findIdx].lastMessage = lastMessage
      state.chats[findIdx].lstMsgDate  = msgDate
      state.chats.sort((chatA,chatB)=> new Date(chatB.createdAt) - new Date(chatA.createdAt))
    }
   },

   typing: (state,action)=>{
    const {payload:typingObj} = action
    state.typingObj = typingObj
   },
/**
 * this accepts username
 *
 */
   searchChats: (state,action) =>{
    const {payload:username} = action
    state.searchChats = state.chats.filter((chat)=>chat.username.includes(username))
    state.searchChats.sort((chatA,chatB)=> chatB.username - chatA.username)
   }
  },
});

export const {addChats,updateLastMessage ,typing,searchChats } = chatsReducer.actions;
export default chatsReducer.reducer;
