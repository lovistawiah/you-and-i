
export interface UserValue {
    id: string,
    username: string,
    bio: string,
    avatarUrl: string
}
export interface UserState {
    value: UserValue | null
}