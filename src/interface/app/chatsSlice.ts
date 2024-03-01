
export type ChatsValue = {
    Id: string,
    userId: string,
    username: string,
    avatarUrl: string,
    lastMessage: string,
    lstMsgDate: Date,
}

export interface TypingObj {
    chatId: string
    typing: "typing..."
}
export type Typing = TypingObj | null

export type SearchChats = ChatsValue[]

export type Chats = ChatsValue[]

export type ChatsState = {
    chats: Chats,
    typing: Typing,
    searchChats: SearchChats
};

export type UpdateLastMessage = {
    chatId: string,
    lastMessage: string,
    msgDate: Date,
}

export type Username = string
