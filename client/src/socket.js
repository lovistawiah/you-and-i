import { io } from "socket.io-client";
import getAuthToken from "./utils/authToken";
const URL = "http://localhost:5000";

const token = getAuthToken();
export const socket = io(URL, {
  autoConnect: true,
  auth: {
    token,
  },
  secure: true,
});
