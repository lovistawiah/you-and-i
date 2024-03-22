import { useEffect } from "react";
import { socket } from "../socket";
import { msgEvents } from "../utils/eventNames";
import { IMessage } from "../db/messages";

const useLastMessage = () => {

  // const chats = useSelector((state)=>state.chats.chats)
  useEffect(() => {
    const handleSendMessage = (msg: IMessage) => {
      msg
    };
    socket.on(msgEvents.sndMsg, handleSendMessage);
    return () => {
      socket.removeListener(msgEvents.sndMsg, handleSendMessage);
    };
  });

  useEffect(() => {
    socket.on(msgEvents.reply, (msg: IMessage) => {
      msg
    });
  });
};

export default useLastMessage;
