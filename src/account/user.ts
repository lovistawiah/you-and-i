import axios, { AxiosError } from "axios";

export interface IUser {
  id: string;
  username: string;
  avatarUrl: string;
  bio: string;
}

export type SignUpParams = {
  email: string;
  password: string;
  confirmPassword: string;
};

export interface SignUpResponse {
  userInfo: IUser;
  token: string;
  message?: string;
}

export type LoginParams = {
  usernameEmail: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  userInfo: IUser;
  message: string;
  status: 200;
};

export type UpdateUserInfoParams = {
  id: string;
  username: string;
};

export type UpdateUserInfoResponse = {
  userInfo: IUser;
  message: string;
  token: string;
};

export type userSettingsParams = {
  id: string;
  username: string;
  bio: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type userSettingsResponse = {
  userInfo: IUser;
  message: string;
};
export type ServerError = {
  status: number;
  message: string;
};

// const baseUrl = 'https://you-and-i-6d9db751f88a.herokuapp.com/api'
const baseUrl = "http://localhost:5000/api";
const serverError = { status: 500, message: "Internal Server Error" };

const axiosError = (err: AxiosError) => {
  const status = err.response?.status ?? err.status ?? 500;
  const message = err.response?.data as string;
  return { status, message };
};

async function signUp({
  email,
  password,
  confirmPassword,
}: SignUpParams): Promise<
  { userInfo: IUser; message?: string, token: string } | ServerError | undefined
> {
  try {
    const result = await axios.post<SignUpResponse>(
      baseUrl + "/signup",
      {
        email,
        password,
        confirmPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (result.status === 200) {
      const { userInfo, token } = result.data;
      return {
        userInfo,
        token
      };
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      return axiosError(err);
    }
    return serverError;
  }
}

async function login({
  usernameEmail,
  password,
}: LoginParams): Promise<
  { status: number; userInfo: IUser, token: string } | ServerError | undefined
> {
  try {
    const result = await axios.post<LoginResponse>(
      baseUrl + "/login",
      { usernameEmail, password },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );
    if (result.status === 200) {
      if (result.data.token !== "") {
        const token = result.data.token;
        const { userInfo } = result.data;
        return { status: 200, userInfo, token };
      }
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      return axiosError(err);
    }
  }
  return serverError;
}

async function updateUserInfo(
  formData: UpdateUserInfoParams,
): Promise<{ userInfo: IUser; message: string, token: string } | ServerError | undefined> {
  try {
    const result = await axios.patch<UpdateUserInfoResponse>(
      baseUrl + "/update-user",
      formData,
    );
    if (result.data.message) {
      const token = result.data.token;
      return {
        userInfo: result.data.userInfo,
        message: result.data.message,
        token
      };
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      return axiosError(err);
    }
    return serverError;
  }
}

async function userSettings(
  formData: userSettingsParams,
): Promise<{ userInfo: IUser; message: string } | ServerError | undefined> {
  try {
    const result = await axios.patch<userSettingsResponse>(
      baseUrl + "/user-settings",
      formData,
    );
    if (result.status === 200) {
      const userInfo = result.data.userInfo;
      const message = result.data.message;
      return {
        userInfo,
        message,
        status: result.status,
      };
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      return axiosError(err);
    }
    return serverError;
  }
}

export { signUp, login, updateUserInfo, userSettings };
