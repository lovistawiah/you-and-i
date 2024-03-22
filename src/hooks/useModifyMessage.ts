import { useEffect } from "react";
import { socket } from "../socket";
import { msgEvents } from "../utils/eventNames";
import { modifyMsg } from "../app/messagesSlice";
import { updateLastMessage } from "../app/chatsSlice";

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
      socket.removeListener(msgEvents.updateMsg);
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
      socket.removeListener(msgEvents.delMsg);
    };
  });
};

export default useModifyMessage;
