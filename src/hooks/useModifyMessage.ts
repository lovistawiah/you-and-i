import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../socket";
import { msgEvents } from "../utils/eventNames";
import { IMessage, modifyMsg } from "../app/messagesSlice";
import { updateLastMessage } from "../app/chatsSlice";
import { State } from "../app/store";


const useModifyMessage = () => {
  const dispatch = useDispatch();
  const storedMessages = useSelector((state: State) => state.messages.messages);

  useEffect(() => {
    socket.on(msgEvents.updateMsg, (msgObj: IMessage) => {
      dispatch(modifyMsg(msgObj));
      //to update the chat last message if updated message is the last message in the messages
      const msgId = msgObj.id;
      const idx = storedMessages.findIndex((stMsg) => stMsg.id === msgId);

      if (idx === storedMessages.length - 1) {
        dispatch(
          updateLastMessage({
            chatId: msgObj.chatId,
            lastMessage: msgObj.message,
            msgDate: msgObj.updatedAt,
          }),
        );
      }
    });
    return () => {
      socket.off(msgEvents.updateMsg);
    };
  });

  useEffect(() => {
    socket.on(msgEvents.delMsg, (msgObj: IMessage) => {
      dispatch(modifyMsg(msgObj));
      //to update the chat last message if deleted message is the last message in the messages
      const msgId = msgObj.id;
      const idx = storedMessages.findIndex((stMsg) => stMsg.id === msgId);
      if (idx === storedMessages.length - 1) {
        dispatch(
          updateLastMessage({
            chatId: msgObj.chatId,
            lastMessage: msgObj.message,
            msgDate: msgObj.updatedAt,
          }),
        );
      }
    });
    return () => {
      socket.off(msgEvents.delMsg);
    };
  });
};

export default useModifyMessage;
