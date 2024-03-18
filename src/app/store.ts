import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { IUserState } from "./userSlice";
import { IChatState } from "./chatSlice";
import { MessagesState } from "./messagesSlice";
import { ContactState } from "./contactsSlice";
import { ChatsState } from "./chatsSlice";

export interface State {
  user: IUserState;
  chat: IChatState;
  messages: MessagesState;
  contacts: ContactState;
  chats: ChatsState;
}

export const store = configureStore({
  reducer: rootReducer,
});
