
export interface UserInfo {
    userId: string,
    username: string,
    avatarUrl?: string,
    bio?: string,
}

export type SignUpParams = {
    email: string, password: string, confirmPassword: string
}

export interface SignUpResponse {
    userInfo: UserInfo
}


export type LoginParams = {
    usernameEmail: string,
    password: string

}


export type LoginResponse = {
    token: string,
    userInfo: UserInfo
    message: string,
    status: 200,
}

export type UpdateUserInfoParams = {
    userId: string,
    username: string
}

export type UpdateUserInfoResponse = {
    userInfo: UserInfo,
    message: string,
    token: string,

}

export type userSettingsParams = UserInfo & {
    currentPassword: string,
    newPassword?: string,
    confirmPassword?: string,
}


export type userSettingsResponse = {
    userInfo: UserInfo,
    message: string
}
export type ServerError = {
    status: number,
    message: string
}