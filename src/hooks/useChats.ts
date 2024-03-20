import { ChangeEvent, useEffect, useState } from "react";
import { socket } from "../socket";
import { chatEvents, msgEvents } from "../utils/eventNames";
import { updateContact } from "../db/contact";
import { ChatsValue, addChat, searchChats, updateChat } from "../db/chats";
import { NewChatAndMessage, addMessage } from "../db/messages";

const useChats = () => {
  const [searchInput, setSearchInput] = useState("");
  const [chats, setChats] = useState<ChatsValue[]>()

  useEffect(() => {
    const getChatData = async (chatsData: ChatsValue) => {
      if (typeof chatsData !== "string") {

        if (typeof chats === 'undefined') {
          setChats([chatsData])
        } else {
          setChats([...chats, chatsData])
        }

        await updateChat(chatsData)
      }
    };
    //old chats
    socket.emit(chatEvents.chatLastMsg, {});
    socket.on(chatEvents.chatLastMsg, getChatData);

    return () => {
      socket.removeListener(chatEvents.chatLastMsg, getChatData);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const clearSearch = () => {
    setSearchInput("");
  };

  useEffect(() => {
    // new chats
    const newChats = async (data: NewChatAndMessage) => {
      const { msgObj, newChat } = data;

      const chatPayload = {
        id: newChat.id,
        userId: newChat.userId,
        chatId: msgObj.chatId,
        username: newChat.username,
        avatarUrl: newChat.avatarUrl,
        lastMessage: msgObj.message,
        lstMsgDate: msgObj.createdAt,
      };

      await addChat(chatPayload)
      await addMessage(msgObj)
      await updateContact({
        id: newChat.userId,
        chatId: newChat.id,
        username: newChat.username,
        avatarUrl: newChat.avatarUrl,
        bio: newChat.bio,
        status: newChat.status
      })

    };
    socket.on(msgEvents.newChat, newChats);
    return () => {
      socket.removeListener(msgEvents.newChat, newChats)
    }
  }, []);

  useEffect(() => {
    const fetchChats = async () => {
      await searchChats(searchInput)
    }
    void fetchChats()
  }, [searchInput]);

  return { searchInput, setSearchInput, handleSearch, clearSearch, chats };
};
export default useChats;
