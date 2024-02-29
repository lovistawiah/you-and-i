import axios, { AxiosError, AxiosResponse } from "axios";
import { SignUpResponse, SignUpParams, LoginParams, LoginResponse, UpdateUserInfoParams, UpdateUserInfoResponse, userSettingsParams, userSettingsResponse, UserInfo } from "../interface/account/user";


// const baseUrl = 'https://you-and-i-6d9db751f88a.herokuapp.com/api'
const baseUrl = "http://localhost:5000/api";

async function signUp({ email, password, confirmPassword }: SignUpParams): Promise<{ status: 200; userInfo: UserInfo } | { status: number; message: string } | undefined> {
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
        status: result.status,
        userInfo
      }
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const status = err.response?.status ?? 500;
      const message = err?.message ?? "Internal Server Error";
      return { status, message };
    }
    return { status: 500, message: "Internal Server Error" }
  }
}

async function login({ usernameEmail, password }: LoginParams) {
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
    if (result.data) {
      if (result.data && result.data.token != "") {
        const token = result.data.token;
        const { userInfo } = result.data;
        localStorage.setItem("Oh_vnyX", token);
        return { status: 200, userInfo };
      }
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const status = err.status ? err.status : 500;
      const message = err.message;
      return { status, message };
    }
  }
}

async function updateUserInfo(formData: UpdateUserInfoParams) {
  try {
    const result = await axios.patch<AxiosResponse, UpdateUserInfoResponse>(baseUrl + "/update-user", formData);
    if (result.data.message) {
      const token = result.data.token;
      localStorage.setItem("Oh_vnyX", token);
      return {
        status: result.status,
        userInfo: result.data.userInfo,
        message: result.data.message,
      };
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const status = err.status ? err.status : 500;
      const message = err.message;
      return { status, message };
    }
  }
}
async function userSettings(formData: userSettingsParams) {
  try {
    const result = await axios.patch<AxiosResponse, userSettingsResponse>(baseUrl + "/user-settings", formData);
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
      const status = err.status ? err.status : 500;
      const message = err.message;
      return { status, message };
    }
  }
}
export { signUp, login, updateUserInfo, userSettings };
const hello = await signUp({ email: "Lovis", password: "flkadjflkad", confirmPassword: "dfldajfljdlfjad" })
hello.