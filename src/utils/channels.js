import { socket } from "../socket";
import { useState } from "react";
import { channelEvents } from "./eventNames";

function getChannels() {
  const [channels, setChannels] = useState(null);
  socket.on(channelEvents.channelAndLastMessage, (data) => {
    setChannels(data);
  });
  return channels;
}

export { getChannels };
