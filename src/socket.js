import { io } from "socket.io-client";
import getAuthToken from "./utils/authToken";
const URL ="https://you-and-i-6d9db751f88a.herokuapp.com/"

const token = getAuthToken();
export const socket = io(URL, {
  autoConnect: true,
  auth: {
    token,
  },
  secure: true,
});
