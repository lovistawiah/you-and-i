
export type UserInfo = {
    userId: string,
    username: string,
    avatarUrl?: string,
    bio?: string,
}

export type SignUPParams = {
    email: string, password: string, confirmPassword: string
}

export type SignUPResponse = {
    status: 200
    data: {
        message: string
        userInfo: UserInfo,
    }
}


export type LoginParams = {
    usernameEmail: string,
    password: string

}


export type LoginResponse = {
    data: {
        token: string,
        userInfo: UserInfo
        message: string,
        status: 200,
    }
}

export type UpdateUserInfoParams = {
    userId: string,
    username: string
}

export type UpdateUserInfoResponse = {
    status: 200
    data: {
        userInfo: UserInfo,
        message: string,
        token: string,
    }
}

export type userSettingsParams = {
    userId: string,
    username?: string,
    bio?: string,
    currentPassword: string,
    newPassword?: string,
    confirmPassword?: string,
}


export type userSettingsResponse = {
    status: 200
    data: {
        userInfo: UserInfo,
        message: string
    }
}