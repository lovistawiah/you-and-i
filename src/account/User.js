import axios from "axios";
const baseUrl = 'http://localhost:5000/api'
async function createUser({ email, password, confirmPassword }) {
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
    if (result.data) {
      localStorage.setItem('userId',result?.data?.userId)
      return { message: "created", status: 200, userId: result.data.userId };
    }
  } catch (err) {
    const status = err.response.status;
    const message = err.response.data.message;
    return { status, message };
  }
}
async function loginUser({ usernameEmail, password }) {
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
    const status = err.response;
    const message = err.response;
    return { status, message };
  }
}
/**
 *
 * @param {File} file 
 */
async function updateUserProfile(formData){
const result = await axios.post(baseUrl+'/update-profile',formData)
return result?.data
}
export { createUser, loginUser ,updateUserProfile};
