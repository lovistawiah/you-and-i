import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../socket";
import { msgEvents } from "../utils/eventNames";
import { modifyMsg } from "../app/messagesSlice";
import { updateLastMessage } from "../app/chatsSlice";
import { State } from "../interface/state";
import { RepliedMessage } from "../interface/app/messagesSlice";
/**
 * this modifies incoming updated message wether deleted or updated.
 *
 * checks each chat's Id and update the last message with the latest message
 */
const useModifyMessage = () => {
  const dispatch = useDispatch();
  const storedMessages = useSelector((state: State) => state.messages.messages);

  useEffect(() => {
    socket.on(msgEvents.updateMsg, (msgObj: RepliedMessage) => {
      dispatch(modifyMsg(msgObj));
      //to update the chat last message if updated message is the last message in the messages
      const msgId = msgObj.Id;
      const idx = storedMessages.findIndex((stMsg) => stMsg.Id === msgId);

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
    socket.on(msgEvents.delMsg, (msgObj: RepliedMessage) => {
      dispatch(modifyMsg(msgObj));
      //to update the chat last message if deleted message is the last message in the messages
      const msgId = msgObj.Id;
      const idx = storedMessages.findIndex((stMsg) => stMsg.Id === msgId);
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
