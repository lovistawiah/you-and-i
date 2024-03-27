import { useEffect } from "react";
import { socket } from "../socket";
import { msgEvents } from "../utils/eventNames";
import { IMessage } from "../db/messages";

const useModifyMessage = () => {
  useEffect(() => {
    socket.on(msgEvents.updateMsg, (msgObj: IMessage) => {
      //to update the chat last message if updated message is the last message in the messages
      msgObj.id;
    });
    return () => {
      socket.removeListener(msgEvents.updateMsg);
    };
  });

  useEffect(() => {
    socket.on(msgEvents.delMsg, (msgObj: IMessage) => {
      msgObj;
    });
    return () => {
      socket.removeListener(msgEvents.delMsg);
    };
  });
};

export default useModifyMessage;
