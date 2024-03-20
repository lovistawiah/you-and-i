import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../socket";
import { msgEvents } from "../utils/eventNames";
import { updateLastMessage } from "../app/chatsSlice";
import { updateNewChat } from "../app/chatSlice";
import { State } from "../app/store";
import { IMessage } from "../app/messagesSlice";

const useLastMessage = () => {
  const dispatch = useDispatch();
  const info = useSelector((state: State) => state.chat.value);
  // const chats = useSelector((state)=>state.chats.chats)
  useEffect(() => {
    const handleSendMessage = (msg: IMessage) => {
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
      socket.removeListener(msgEvents.sndMsg, handleSendMessage);
    };
  });

  useEffect(() => {
    socket.on(msgEvents.reply, (msg: IMessage) => {
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
