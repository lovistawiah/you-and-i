import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from './rootReducer'
import { UserState } from "./userSlice";
import { ChatState } from "./chatSlice";
import { MessagesState } from "./messagesSlice";
import { ContactState } from "./contactsSlice";
import { ChatsState } from "./chatsSlice";


export interface State {
  user: UserState,
  chat: ChatState,
  messages: MessagesState,
  contacts: ContactState,
  chats: ChatsState
}

export const store = configureStore({
  reducer: rootReducer,
});

