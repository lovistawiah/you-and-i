import axios, { AxiosError } from "axios";
// const baseUrl = 'https://you-and-i-6d9db751f88a.herokuapp.com/api'
const baseUrl ="http://localhost:5000/api"
async function signUp({ email, password, confirmPassword }) {
  try {
    if (!email || !password || !confirmPassword) {
      return { code: 400, message: "all fields are required" };
    }
    if (password != confirmPassword) {
      return { code: 400, message: "passwords do not match" };
    }
    const result = await axios.post(baseUrl+"/signup",
      {
        email,
        password,
        confirmPassword,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (result.status === 200) {
      const { userInfo } = result.data
      return {
        userInfo,
        status: result.status
      }
    }

    return {
      message: result.data?.message,
      status: result.status
    }
    
  } catch (err) {

   if(err instanceof AxiosError){
      const status = err.response.status
      const {message}  = err.response.data
       return { status, message };
    }
  }
}
async function login({ usernameEmail, password }) {
  try {
    const result = await axios.post(
      baseUrl+"/login",
      { usernameEmail, password },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (result.data) {
      if (result.data.token && result.data.token != "") {
        const token = result.data.token;
        const { userInfo } = result.data
        localStorage.setItem("Oh_vnyX", token);
        
        return { status: 200, message: "ok",userInfo };
      }
    }
  } catch (err) {
   if(err instanceof AxiosError){
      const status = err.response.status
      const {message}  = err.response.data
       return { status, message };
    }
  }
}

async function updateUserInfo(formData){
  try {
    const result = await axios.patch(baseUrl + '/update-user',formData)
    if(result.data.message){
      const token = result.data.token
     localStorage.setItem("Oh_vnyX", token);
      return {
        status: result.status,
        userInfo: result.data?.userInfo,
        message: result.data?.message
      }
    }
    
  } catch (err) {
     if(err instanceof AxiosError){
      const status = err.response.status
      const {message}  = err.response.data
       return { status, message };
    }
  }
}
async function userSettings(formData){
  try {
    const result = await axios.patch(baseUrl + '/user-settings',formData)
    if(result.status === 200){
      const userInfo = result.data.userInfo
      const message = result.data.message
      return {
        userInfo,
        message,
        status: result.status
      }
      
    }
    
  } catch (err) {
    if(err instanceof AxiosError){
      const status = err.response.status
      const {message}  = err.response.data
       return { status, message };
    }
  }
}
export { signUp, login ,updateUserInfo,userSettings};
