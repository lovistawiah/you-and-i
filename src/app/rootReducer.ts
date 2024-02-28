import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import chatReducer from "./chatSlice";
import chatsReducer from "./chatsSlice";
import contactsReducer from "./contactsSlice";
import messageReducer from "./messagesSlice";


export const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer,
  chats: chatsReducer,
  contacts: contactsReducer,
  messages: messageReducer,
});

