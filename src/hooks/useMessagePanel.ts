import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useModifyMessage from "./useModifyMessage";
import { usrEvents } from "../utils/eventNames";
import { socket } from "../socket";

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
  const [showEmojis, setShowEmojis] = useState(false);
  const [message, setMessage] = useState("");
  useModifyMessage();

  const handleCancelUpdate = () => {
    setMessage("");
  };

  const updateMessage = () => {
  };

  const reply = () => {
    return;
  };

  const sendMessage = () => {

  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) return;
    updateMessage();
    reply();
    sendMessage();
    setMessage("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!message) return;
      updateMessage();
      reply();
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
  };
};

export default useMessagePanel;
