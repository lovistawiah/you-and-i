import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import { usrEvents } from "../utils/eventNames";
import { IChatInfo, clearChat, getChat, updateStatus } from "../db/chat";

const useChatInfo = () => {
  const [chatInfo, setChatInfo] = useState<IChatInfo>();
  const navigate = useNavigate();

  const goBack = async () => {
    await clearChat();
    navigate("/");
  };

  const fetchChatInfo = async () => {
    try {
      const chat = await getChat();

      if (chat) {
        setChatInfo({
          avatarUrl: chat.avatarUrl,
          userId: chat.userId,
          username: chat.username,
          chatId: chat.chatId,
          status: chat.status
        });
      }

    } catch (error) {
      console.error("Error fetching chat information:", error);
    }
  };

  useEffect(() => {
    void fetchChatInfo();
  }, []);

  useEffect(() => {
    const handleStatusUpdate = async (userStats: { userId: string; status: string }) => {
      try {
        await updateStatus(userStats);
      } catch (error) {
        console.error("Error updating status:", error);
      }
    };

    socket.emit(usrEvents.status, chatInfo?.userId);
    socket.on(usrEvents.status, handleStatusUpdate);

    return () => {
      socket.removeListener(usrEvents.status, handleStatusUpdate);
    };
  }, [chatInfo]);

  return { goBack, chatInfo };
};

export default useChatInfo;
