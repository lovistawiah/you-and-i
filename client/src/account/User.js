async function createUser({ queryKey }) {
  const { username, email, password, confirmPassword } = queryKey[1];
  const res = await fetch("http://localhost:5000/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: { username, email, password, confirmPassword },
  });
  if (!res.ok) {
    const status = res.status;
    const message = res.statusText;
    return { status, message };
  }
  return res.json();
}

async function verifyUser({ queryKey }) {
  const { code, id } = queryKey[1];

  const result = await fetch("http://localhost:5000/api/verify", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: { code, id },
  });

  if (!result.ok) {
    const status = result.status;
    const message = result.statusText;
    return { status, message };
  }
  return result.json();
}

async function loginUser({ queryKey }) {
  const { usernameEmail, password } = queryKey[1];
  const result = await fetch("http://localhost:5000/api/login", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: { usernameEmail, password },
  });
  if (!result.ok) {
    const status = result.status;
    const message = result.statusText;
    return { status, message };
  }
  return result.json();
}
export { createUser, loginUser };
