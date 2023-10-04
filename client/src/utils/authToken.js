function getAuthToken(cookieName) {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name == cookieName) {
      const token = value != undefined ? value : undefined;
      return token;
    }
  }
  return undefined;
}

export default getAuthToken;
