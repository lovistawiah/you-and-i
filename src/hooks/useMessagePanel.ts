import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useModifyMessage from "./useModifyMessage";
import { msgEvents, usrEvents } from "../utils/eventNames";
import { socket } from "../socket";
import { getChat, IChatInfo } from "../db/chat";

interface IEmoji {
  id: string;
  keywords: Array<string>;
  name: string;
  native: string;
  shortcode: string;
  unified: string;
}

const useMessagePanel = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [chatInfo, setChatInfo] = useState<IChatInfo>()
  const [showEmojis, setShowEmojis] = useState(false);
  const [message, setMessage] = useState("");
  const [updateMsg, setUpdateMsg] = useState(false)
  useModifyMessage();

  const handleCancelUpdate = () => {
    setUpdateMsg(false)
    setMessage("");
  };

  // const updateMessage = () => {
  //   setUpdateMsg(true)
  // };

  // const reply = () => {
  //   return;
  // };

  const sendMessage = () => {
    const userId = chatInfo?.userId
    const chatId = chatInfo?.chatId
    if (userId && chatId) {
      const messageObj = {
        chatId,
        message
      }
      socket.emit(msgEvents.sndMsg, messageObj)
      return
    }
    if (userId && !chatId) {
      const messageObj = {
        userId,
        message
      }
      socket.emit(msgEvents.newChat, messageObj)
      return
    }

  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(message)
    if (!message) return;
    // updateMessage();
    // reply();
    sendMessage();
    setMessage("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!message) return;
      console.log(message)
      // updateMessage();
      // reply();
      sendMessage();
      setMessage("");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth]);

  useEffect(() => {
    const fetchChatInfo = async () => {
      const chat = await getChat()
      if (!chat) return
      setChatInfo(chat)
    }
    void fetchChatInfo();
  }, [])

  const handleShowEmoji = () => {
    setShowEmojis(showEmojis ? false : true);
  };

  const getEmoji = (emojiObj: IEmoji) => {
    const emoji = emojiObj.native;
    setMessage(message + emoji);
  };

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (message) {
      socket.emit(usrEvents.typing);
    }
  };

  return {
    windowWidth,
    handleOnChange,
    handleCancelUpdate,
    handleShowEmoji,
    getEmoji,
    showEmojis,
    message,
    onKeyDown,
    submitForm,
    chatInfo,
    updateMsg
  };
};

export default useMessagePanel;
