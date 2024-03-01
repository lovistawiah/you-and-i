export type ChatValue = {
    userId: string,
    chatId?: string,
    username: string,
    status: string
    avatarUrl: string
}
export interface Chat {
    value: ChatValue | null
}

export type SelectedChat = {
    userId: string,
    Id: string
    avatarUrl: string,
    username: string
}