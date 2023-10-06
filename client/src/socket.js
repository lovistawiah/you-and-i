import { io } from "socket.io-client";
import getAuthToken from "./utils/authToken";
const URL =
  "http://localhost:5000" ||
  "http://172.24.0.1:5173/" ||
  "http://172.20.10.2:5173/";

const token = getAuthToken();
export const socket = io(URL, {
  autoConnect: true,
  auth: {
    token,
  },
  secure: true,
});
