import { useEffect } from "react";
import { addMessage } from "../app/messagesSlice";
import { socket } from "../socket";
import { msgEvents } from "../utils/eventNames";

const useMessages = ({
  chatId,
  messagesRef,
}: {
  chatId: string;
  messagesRef: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  const dispatch = useDispatch();
  const messages = useSelector((state: State) => state.messages.messages);

  useEffect(() => {
    const getMessages = (messagesData: IMessage) => {
      dispatch(addMessage(messagesData));
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
      dispatch(addMessage(messageData));
    });
  });

  useEffect(() => {
    socket.on(msgEvents.reply, (msg: IMessage) => {
      dispatch(addMessage(msg));
    });
  });

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);
};

export default useMessages;
