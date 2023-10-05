function getAuthToken() {
  const token = localStorage.getItem("Oh_vnyX");
  if (token && typeof token == "string") {
    return token;
  }
  return undefined;
}

export default getAuthToken;
