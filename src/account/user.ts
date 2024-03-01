import axios, { AxiosError } from "axios";
import { SignUpResponse, SignUpParams, LoginParams, LoginResponse, UpdateUserInfoParams, UpdateUserInfoResponse, userSettingsParams, userSettingsResponse, UserInfo, ServerError } from "../interface/account/user";


// const baseUrl = 'https://you-and-i-6d9db751f88a.herokuapp.com/api'
const baseUrl = "http://localhost:5000/api";
const serverError = { status: 500, message: "Internal Server Error" }
const axiosError = (err: AxiosError) => {
  const status = err.response?.status ?? err.status ?? 500;
  const message: any = err.response?.data?.message ?? err.message ?? "Internal Server Error";
  return { status, message };
}
async function signUp({ email, password, confirmPassword }: SignUpParams): Promise<{ userInfo: UserInfo } | ServerError | undefined> {
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
    if (result.data && result.status === 200) {
      const { userInfo } = result.data
      return {
        userInfo
      }
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      axiosError(err)
    }
    return serverError;
  }
}

async function login({ usernameEmail, password }: LoginParams): Promise<{ status: number, userInfo: UserInfo } | ServerError | undefined> {
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
    if (result.data && result.status === 200) {
      if (result.data.token !== "") {
        const token = result.data.token;
        const { userInfo } = result.data;
        localStorage.setItem("Oh_vnyX", token);
        return { status: 200, userInfo };
      }
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      axiosError(err)
    }
  }
  return serverError
}

async function updateUserInfo(formData: UpdateUserInfoParams): Promise<{ userInfo: UserInfo, message: string } | ServerError | undefined> {
  try {
    const result = await axios.patch<UpdateUserInfoResponse>(baseUrl + "/update-user", formData);
    if (result.data.message) {
      const token = result.data.token;
      localStorage.setItem("Oh_vnyX", token);
      return {
        userInfo: result.data.userInfo,
        message: result.data.message,
      };
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      axiosError(err)
    }
    return serverError
  }
}


async function userSettings(formData: userSettingsParams): Promise<{ userInfo: UserInfo, message: string } | ServerError | undefined> {
  try {
    const result = await axios.patch<userSettingsResponse>(baseUrl + "/user-settings", formData);
    if (result.status === 200) {
      const userInfo = result.data.userInfo;
      const message = result.data.message;
      return {
        userInfo,
        message,
        status: result.status
      };
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      axiosError(err)
    }
    return serverError
  }
}
export { signUp, login, updateUserInfo, userSettings };
