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