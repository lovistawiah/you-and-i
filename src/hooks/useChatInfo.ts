import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import { usrEvents } from "../utils/eventNames";
import { IChatInfo, getChat, updateStatus } from "../db/chat";

const useChatInfo = () => {
  const [chatInfo, setChatInfo] = useState<IChatInfo>();
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/");
  };

  useEffect(() => {
    socket.emit(usrEvents.status, chatInfo?.userId);
    socket.on(usrEvents.status, async (userStats: { userId: string; status: string }) => {
      await updateStatus(userStats);
    });
    return () => {
      socket.removeListener(usrEvents.status);
    };
  });

  useEffect(() => {
    const fetchChatInfo = async () => {
      const chat = await getChat();
      if (!chat?.value) return;
      setChatInfo({
        userId: chat.value.userId,
        avatarUrl: chat.value.avatarUrl,
        status: chat.value.status,
        username: chat.value.username,
      });
    };
    void fetchChatInfo();
  }, []);

  return { goBack, chatInfo };
};

export default useChatInfo;
