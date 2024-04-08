import { useEffect, useRef, useState } from "react";
import { socket } from "../socket";
import { msgEvents } from "../utils/eventNames";
import { addMessages, IMessage } from "../db/messages";
import { getChat } from "../db/chat";

const useMessages = () => {
  const [chatId, setChatId] = useState<string>()
  const [messages, setMessages] = useState<IMessage[]>()
  const [msgToBeReplied, setMsgToBeReplied] = useState<{ id: string, message: string }>()
  const messagesRef = useRef(null);

  const datesSet = new Set();

  const addDateToSet = (messageDate: string) => {
    if (!datesSet.has(messageDate)) {
      datesSet.add(messageDate);
      return true;
    }
    return false;
  };

  const clearModal = () => {
    setMsgToBeReplied(undefined)
  }

  useEffect(() => {
    const fetchChatId = async () => {
      const chat = await getChat()
      const chatId = chat?.chatId
      if (chatId) {
        setChatId(chatId)
      }
    }
    void fetchChatId();
  }, [])

  useEffect(() => {
    const getMessages = (messagesData: IMessage) => {
      setMessages((prev) => {
        return prev ? [...prev, messagesData] : [messagesData]
      })
    };
    socket.emit(msgEvents.msgs, chatId);
    socket.on(msgEvents.msgs, getMessages);

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    return () => {
      socket.removeListener(msgEvents.msgs, getMessages);
      socket.removeListener("error");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  useEffect(() => {
    const addMessage = async () => {
      if (messages) {
        await addMessages(messages)
      }
    }
    void addMessage()
  }, [messages])

  useEffect(() => {
    socket.on(msgEvents.sndMsg, (messageData: IMessage) => {
      console.log(messageData)
    });
  });

  useEffect(() => {
    socket.on(msgEvents.reply, (msg: IMessage) => {
      msg;
    });
  });

  return { messages, addDateToSet, datesSet, messagesRef, msgToBeReplied, clearModal }
};

export default useMessages;
