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
    if (result.data) {
      return { message: "created", code: 200 };
    }
  } catch (err) {
    const code = err.response.status;
    const message = err.response.data.message;
    return { code, message };
  }
}

async function longiUser({usernameEmail,password}) {
try {
  const result = await axios.post("http://localhost:5000/api/login",
  {usernameEmail
    ,password
  },{
    headers: {
      "Content-Type":"application/x-www-form-urlencoded"
    }
  })
  if(result.data) {
    return {code: 200, message: 'ok'}
  }
} catch (err) {
  const code = err.response.status;
  const message = err.response.data.message;
  return { code, message };
}
}
export {createUser,longiUser}



