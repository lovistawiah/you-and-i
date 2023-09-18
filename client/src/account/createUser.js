async function createUser({
  firstName,
  lastName,
  username,
  email,
  password,
  confirmPassword,
}) {
  try {
    // eslint-disable-next-line no-undef
    const result = await axios.post(
      "http://localhost:5000/api/signup",
      {
        firstName,
        lastName,
        email,
        username,
        password,
        confirmPassword,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log(result.json());
  } catch (err) {
    console.log(err);
  }
}

export default createUser;
