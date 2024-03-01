import { Chat } from "./app/chatSlice";
import { UserState } from "./app/userSlice";

export interface State {
    user: UserState
    chat: Chat
}