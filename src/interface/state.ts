import { Chat } from "./app/chatSlice";
import { ChatsState } from "./app/chatsSlice";
import { ContactState } from "./app/contactsSlice";
import { MessagesState } from "./app/messagesSlice";
import { UserState } from "./app/userSlice";

export interface State {
    user: UserState
    chat: Chat
    messages: MessagesState
    contacts: ContactState
    chats: ChatsState
}