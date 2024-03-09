export type ChatValue = {
    userId: string,
    id?: string,
    username: string,
    status: string
    avatarUrl: string
}
export interface Chat {
    value: ChatValue
}

export type SelectedChat = {
    userId: string,
    id: string
    avatarUrl: string,
    username: string
}