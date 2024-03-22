import { useEffect, useState } from "react";

import { Chat, clearChat } from "../db/chat";
import { addChat } from "../db/chat";
import { clearMessages } from "../db/messages";

const useChat = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleChat = async ({
    userId,
    id,
    avatarUrl,
    username,
  }: {
    userId: string;
    id: string;
    avatarUrl: string;
    username: string;
  }) => {
    const chatObj: Chat = {
      avatarUrl,
      userId,
      username,
      id,
    };
    await clearChat();
    //handle selected chat.
    await addChat(chatObj);
    await clearMessages();
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth]);

  return { windowWidth, handleChat };
};

export default useChat;
