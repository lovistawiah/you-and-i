import { usrEvents } from "../utils/eventNames";
import { socket } from "../socket";
import { useEffect, useState } from "react";
import { Typing } from "../app/userSlice";

const useTyping = () => {
  const [isTypingObj, setIsTypingObj] = useState<Typing>(null);

  useEffect(() => {
    let noDataTimeout: NodeJS.Timeout;
    function startNoDataTimer() {
      noDataTimeout = setTimeout(() => {
        setIsTypingObj(null);
      }, 1400);
    }
    socket.on(usrEvents.typing, (data: Typing) => {
      const chatId = data?.chatId;
      if (chatId) {
        clearTimeout(noDataTimeout);
        setIsTypingObj(data);
      }
      startNoDataTimer();
    });
    return () => {
      socket.off(usrEvents.typing);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
  return { isTypingObj };
};

export default useTyping;
