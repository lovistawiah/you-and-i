import axios, { AxiosError, AxiosResponse } from "axios";
import { SignUPResponse, SignUPParams, LoginParams, LoginResponse, UpdateUserInfoParams, UpdateUserInfoResponse, userSettingsParams, userSettingsResponse } from "../interface/account/user";
// const baseUrl = 'https://you-and-i-6d9db751f88a.herokuapp.com/api'
const baseUrl = "http://localhost:5000/api";

async function signUp({ email, password, confirmPassword }: SignUPParams) {
  try {
    if (!email || !password || !confirmPassword) {
      return { code: 400, message: "all fields are required" };
    }
    if (password != confirmPassword) {
      return { code: 400, message: "passwords do not match" };
    }
    const result = await axios.post<AxiosResponse, SignUPResponse>(
      baseUrl + "/signup",
      {
        email,
        password,
        confirmPassword,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },

    );
    if (result.status === 200) {
      const { userInfo } = result.data

      return {
        userInfo,
        status: result.status,
      };
    }

    return {
      message: result.data.message,
      status: result.status,
    };
  } catch (err) {
    if (err instanceof AxiosError) {
      const status = err.status;
      const message = err.message;
      return { status, message };
    }
  }
}

async function login({ usernameEmail, password }: LoginParams) {
  try {
    const result = await axios.post<AxiosResponse, LoginResponse>(
      baseUrl + "/login",
      { usernameEmail, password },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );
    if (result.data) {
      if (result.data.token && result.data.token != "") {
        const token = result.data.token;
        const { userInfo } = result.data;
        localStorage.setItem("Oh_vnyX", token);

        return { status: 200, message: "ok", userInfo };
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
