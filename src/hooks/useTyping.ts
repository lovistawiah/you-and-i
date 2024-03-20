import { usrEvents } from "../utils/eventNames";
import { socket } from "../socket";
import { useEffect, useState } from "react";
interface ITyping {
  chatId?: string,
  typing: 'typing...'
}

const useTyping = () => {
  const [isTypingObj, setIsTypingObj] = useState<ITyping | null>(null);

  useEffect(() => {
    let noDataTimeout: NodeJS.Timeout;
    function startNoDataTimer() {
      noDataTimeout = setTimeout(() => {
        setIsTypingObj(null);
      }, 1400);
    }
    socket.on(usrEvents.typing, (data: ITyping) => {
      const chatId = data.chatId;
      if (chatId) {
        clearTimeout(noDataTimeout);
        setIsTypingObj(data);
      }
      startNoDataTimer();
    });
    return () => {
      socket.removeListener(usrEvents.typing);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return { isTypingObj };
};

export default useTyping;
