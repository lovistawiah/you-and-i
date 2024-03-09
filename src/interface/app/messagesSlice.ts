type MessageInfo = "created" | "updated" | "deleted";
export interface IBaseMessage {
    id: string,
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
export interface IMessage extends IBaseMessage {
    reply?: Reply
}

export type MsgToBeReplied = {
    id: string,
    message: string
} | null

export type MsgToBeUpdated = {
    id: string,
    message: string
} | null

export type UpdateMsg = boolean;

export type MessagesState = {
    messages: IMessage[],
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
    msgObj: IMessage
}

export type MessageProps = {
    message: string,
    sender: string,
    msgDate: string | Date,
    userId: string,
    id: string,
    info: MessageInfo,
    reply?: Reply,
}