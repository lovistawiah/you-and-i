import { useState } from "react";
import { IChatInfo } from "../db/chat";
import { ChatContext } from "../context/ChatContext";

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chatInfo, setChatInfo] = useState<IChatInfo | null>(null);
  return (
    <ChatContext.Provider value={{ chatInfo, setChatInfo }}>
      {children}
    </ChatContext.Provider>
  );
};
