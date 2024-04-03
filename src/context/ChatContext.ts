import { createContext } from "react";
import { IChatInfo } from "../db/chat";

interface ChatContextType {
    chatInfo: IChatInfo | null;
    setChatInfo: React.Dispatch<React.SetStateAction<IChatInfo | null>>
}

export const ChatContext = createContext<ChatContextType>({
    chatInfo: null,
    setChatInfo: () => null,
})