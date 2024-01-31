import { io } from "socket.io-client";
import getAuthToken from "./utils/authToken";
const URL ="http://localhost:5000"
//https://you-and-i-6d9db751f88a.herokuapp.com/  -- for prod
const token = getAuthToken();
export const socket = io(URL, {
  autoConnect: true,
  auth: {
    token,
  },
  secure: true,
});
