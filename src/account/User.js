import axios, { AxiosError } from "axios";
const baseUrl = 'http://localhost:5000/api'
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
      const message = err.message
      const status = err.code
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
        localStorage.setItem("Oh_vnyX", token);
        return { status: 200, message: "ok" };
      }
    }
  } catch (err) {
   if(err instanceof AxiosError){
      const message = err.message
      const status = err.code
       return { status, message };
    }
  }
}
/**
 *
 * @param {File} file 
 */
async function updateUserProfile(formData){
  try {
    const result = await axios.post(baseUrl+'/update-profile',formData)
    return {
      status: result.status,
      message: result.data?.message,
      url: result?.data?.url
    }
  } catch (err) {
    if(err instanceof AxiosError){
      const message = err.message
      const status = err.code
       return { status, message };
    }
  }
}

async function updateUserInfo(formData){
  try {
    const result = await axios.patch(baseUrl + '/update-user',formData)
    console.log(result)
    if(result.data.message){
      return result.data?.userInfo
    }
    
  } catch (err) {
    if(err instanceof AxiosError){
      const message = err.message
      const status = err.code
       return { status, message };
    }
  }

}
export { signUp, login ,updateUserProfile,updateUserInfo};
