import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useModifyMessage from "./useModifyMessage";
import { msgEvents, usrEvents } from "../utils/eventNames";
import { socket } from "../socket";
import { cancelUpdate, replyMessage } from "../app/messagesSlice";

interface IEmoji {
  id: string;
  keywords: Array<string>;
  name: string;
  native: string;
  shortcode: string;
  unified: string;
}

const useMessagePanel = () => {
  const chatInfo = useSelector((state: State) => state.chat.value);
  const msgToBeUpdated = useSelector((state: State) => state.messages.msgToBeUpdated);
  const msgToBeReplied = useSelector((state: State) => state.messages.msgToBeReplied);
  // ? a boolean to toggle the cancel button when updating
  const updateMsg = useSelector((state: State) => state.messages.updateMsg);
  const dispatch = useDispatch();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showEmojis, setShowEmojis] = useState(false);
  const [message, setMessage] = useState("");
  useModifyMessage();

  const handleCancelUpdate = () => {
    setMessage("");
    dispatch(cancelUpdate());
  };

  const updateMessage = () => {
    if (updateMsg) {
      const update = {
        id: msgToBeUpdated?.id,
        message,
      };
      socket.emit(msgEvents.updateMsg, update);
      handleCancelUpdate();
      return;
    }
  };

  const reply = () => {
    if (msgToBeReplied) {
      const id = msgToBeReplied.id;
      const chatId = chatInfo?.chatId;
      if (!id && !chatId) return;
      const replyObj = {
        id,
        chatId,
        message,
      };
      socket.emit(msgEvents.reply, replyObj);
      setMessage("");
      dispatch(replyMessage(null));
      return;
    }
  };

  const sendMessage = () => {
    const chatId = chatInfo?.chatId;
    const userId = chatInfo?.userId;
    if (chatId && userId) {
      const messageObj = {
        chatId,
        message,
      };

      socket.emit(msgEvents.sndMsg, messageObj);
    } else if (userId && !chatId) {
      const messageObj = {
        userId,
        message,
      };
      socket.emit(msgEvents.newChat, messageObj);
    }
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
      socket.emit(usrEvents.typing, { chatId: chatInfo?.chatId });
    }
  };

  useEffect(() => {
    if (updateMsg && msgToBeUpdated) {
      const message = msgToBeUpdated.message;
      setMessage(message);
    }
  }, [updateMsg, msgToBeUpdated]);

  return {
    windowWidth,
    handleOnChange,
    handleCancelUpdate,
    handleShowEmoji,
    getEmoji,
    showEmojis,
    message,
    chatInfo,
    updateMsg,
    onKeyDown,
    submitForm,
  };
};

export default useMessagePanel;
