import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { socket } from "../socket";
import { chatEvents, msgEvents } from "../utils/eventNames";
import { addChats, addNewChat, searchChats } from "../app/chatsSlice";
import { addMessage } from "../app/messagesSlice";
import { updateContact } from "../app/contactsSlice";

const useChats = () => {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getChatData = (chatsData) => {
      if (typeof chatsData !== "string") {
        dispatch(addChats(chatsData));
      }
    };
    //old chats
    socket.emit(chatEvents.chatLastMsg, {});
    socket.on(chatEvents.chatLastMsg, getChatData);

    return () => {
      socket.off(chatEvents.chatLastMsg, getChatData);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // new chats
    const newChats = (data) => {
      const { msgObj, newChat } = data;
      const chatPayload = {
        Id: newChat.Id,
        userId: newChat.userId,
        username: newChat.username,
        avatarUrl: newChat.avatarUrl,
        lastMessage: msgObj.message,
        lstMsgDate: msgObj.createdAt,
      };

      dispatch(addNewChat(chatPayload));
      dispatch(addMessage(msgObj));

      dispatch(
        updateContact({
          Id: newChat.userId,
          chatId: newChat.Id,
        }),
      );
    };
    socket.on(msgEvents.newChat, newChats);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    dispatch(searchChats(searchInput));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);
  return { searchInput, setSearchInput };
};
export default useChats;
