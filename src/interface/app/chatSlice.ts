export interface ChatValue {
    userId: string,
    chatId?: string,
    username: string,
    status: string
    avatarUrl: string
}
export interface Chat {
    value: ChatValue | null
}