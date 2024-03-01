type MessageInfo = "created" | "updated" | "deleted";
export type Message = {
    Id: string,
    message: string,
    sender: string,
    updatedAt: Date,
    createdAt: Date,
    chatId: string,
    info: MessageInfo
}
export type RepliedMessage = Message & {
    reply: {
        Id: string,
        message: string,
        sender: string,
        info: MessageInfo,
    },
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
    messages: Message[],
    msgToBeUpdated: MsgToBeUpdated,
    updateMsg: UpdateMsg,
    msgToBeReplied: MsgToBeReplied,
}