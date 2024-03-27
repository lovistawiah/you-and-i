import { useEffect } from "react";
import { socket } from "../socket";
import { msgEvents } from "../utils/eventNames";
import { IMessage } from "../db/messages";

const useMessages = ({
  chatId,
}: {
  chatId: string;
  messagesRef: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  useEffect(() => {
    const getMessages = (messagesData: IMessage) => {
      messagesData;
    };
    socket.emit(msgEvents.msgs, chatId);
    socket.on(msgEvents.msgs, getMessages);

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    return () => {
      socket.removeListener(msgEvents.msgs, getMessages);
      socket.removeListener("error");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  useEffect(() => {
    socket.on(msgEvents.sndMsg, (messageData: IMessage) => {
      messageData;
    });
  });

  useEffect(() => {
    socket.on(msgEvents.reply, (msg: IMessage) => {
      msg;
    });
  });
};

export default useMessages;
