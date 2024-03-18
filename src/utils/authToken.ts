import { getToken } from "../db/user";


async function getAuthToken() {
  const token = await getToken()
  return token
}

export default getAuthToken;
