type MessageInfo = "created" | "updated" | "deleted";
export interface Message {
    Id: string,
    message: string,
    sender: string,
    updatedAt: Date,
    createdAt: Date,
    chatId: string,
    info: MessageInfo
}
type Reply = {
    Id: string,
    message: string,
    sender: string,
    info: MessageInfo,

}
export interface RepliedMessage extends Message {
    reply: Reply
}

export type MsgToBeReplied = {
    msgId: string,
    message: string
} | null

export type MsgToBeUpdated = {
    msgId: string,
    message: string
} | null

export type UpdateMsg = boolean;

export type MessagesState = {
    messages: RepliedMessage[],
    msgToBeUpdated: MsgToBeUpdated,
    updateMsg: UpdateMsg,
    msgToBeReplied: MsgToBeReplied,
}
export type NewChatAndMessage = {
    newChat: {
        Id: string
        userId: string,
        username: string,
        avatarUrl: string
    }
    msgObj: Message
}

export type MessageProps = {
    message: string,
    sender: string,
    msgDate: string | Date,
    userId: string,
    msgId: string,
    info: MessageInfo,
    reply?: Reply,
}