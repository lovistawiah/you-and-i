import axios from "axios";

async function createUser({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
}) {
  try {
    if (!firstName || !lastName || !email) {
      return { code: 400, message: "all fields are required" };
    }
    if (password != confirmPassword) {
      return { code: 400, message: "passwords do not match" };
    }
    const result = await axios.post(
      "http://localhost:5000/api/signup",
      {
        firstName,
        lastName,
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
    console.log(result);
    if (result.data) {
      return { message: "created", status: 200, userId: result.data.userId };
    }
  } catch (err) {
    const status = err.response.status;
    const message = err.response.data.message;
    return { status, message };
  }
}

async function verifyUser(obj) {
  try {
    console.log(obj)
    const result = await axios.post(
      "http://localhost:5000/api/verify",
      {
        obj,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (result.data) {
      console.log(data)
      return { status: 200, message: "ok" };
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
      "http://localhost:5000/api/login",
      { usernameEmail, password },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (result.data) {
      return { code: 200, message: "ok" };
    }
  } catch (err) {
    const status = err.response.status;
    const message = err.response.data.message;
    return { status, message };
  }
}
export { createUser, loginUser, verifyUser };
