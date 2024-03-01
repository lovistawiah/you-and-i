import { Chat } from "./app/chatSlice";
import { MessagesState } from "./app/messagesSlice";
import { UserState } from "./app/userSlice";

export interface State {
    user: UserState
    chat: Chat
    messages: MessagesState
}