import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../socket";
import { msgEvents } from "../utils/eventNames";
import { updateLastMessage } from "../app/chatsSlice";
import { updateNewChat } from "../app/chatSlice";

/**
 * Socket listens to incoming message.
 *
 * create an new chat if chat does not exist else update last message of chat
 */
const useLastMessage = () => {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.chat.value);
  // const chats = useSelector((state)=>state.chats.chats)
  useEffect(() => {
    const handleSendMessage = (msg) => {
      dispatch(
        updateLastMessage({
          chatId: msg.chatId,
          lastMessage: msg.message,
          msgDate: msg.createdAt,
        }),
      );
      dispatch(updateNewChat({ chatId: msg.chatId, userId: info?.userId }));
    };
    socket.on(msgEvents.sndMsg, handleSendMessage);
    return () => {
      socket.off(msgEvents.sndMsg, handleSendMessage);
    };
  });

  useEffect(() => {
    socket.on(msgEvents.reply, (msg) => {
      dispatch(
        updateLastMessage({
          chatId: msg.chatId,
          lastMessage: msg.message,
          msgDate: msg.createdAt,
        }),
      );
    });
  });
};

export default useLastMessage;
