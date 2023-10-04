import { io } from "socket.io-client";
import getAuthToken from "./utils/authToken";
const URL = "http://localhost:5000";

const token = getAuthToken("authToken");
console.log(token);
export const socket = io(URL, {
  auth: {
    token,
  },
});

