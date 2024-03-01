import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { faFaceSmile, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextareaAutoResize from "react-textarea-autosize";
import { socket } from "../socket";
import { msgEvents, usrEvents } from "../utils/eventNames";
import ChatInfo from "./ChatInfo";
import Messages from "./Messages";
import { cancelUpdate, replyMessage } from "../app/messagesSlice";
import useModifyMessage from "../hooks/useModifyMessage";
import { State } from "../interface/state";
import { ChatValue } from "../interface/app/chatSlice";

const MessagePanel = () => {
  const chatInfo = useSelector((state: State) => state.chat.value);
  const msgToBeUpdated = useSelector(
    (state: State) => state.messages.msgToBeUpdated,
  );
  const msgToBeReplied = useSelector(
    (state: State) => state.messages.msgToBeReplied,
  );
  // ? a boolean to toggle the cancel button when updating
  const updateMsg = useSelector((state: State) => state.messages.updateMsg);
  const dispatch = useDispatch();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showEmojis, setShowEmojis] = useState(false);
  const [message, setMessage] = useState("");
  useModifyMessage();

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) return;
    // updateMsg turns true if updateSingleMsg obj is set
    if (updateMsg) {
      const update = {
        msgId: msgToBeUpdated?.msgId,
        message,
      };
      socket.emit(msgEvents.updateMsg, update);
      handleCancelUpdate();
      return;
    }

    if (msgToBeReplied) {
      const msgId = msgToBeReplied.msgId;
      const { chatId } = chatInfo as ChatValue;
      if (!msgId && !chatId) return;
      const replyObj = {
        msgId,
        chatId,
        message,
      };
      socket.emit(msgEvents.reply, replyObj);
      setMessage("");
      dispatch(replyMessage(null));
      return;
    }
    const { userId, chatId } = chatInfo as ChatValue;
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
    setMessage("");
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key == "Enter" && !e.shiftKey) {
      submitForm(e);
    }
  };

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    submitForm(e);
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

  const getEmoji = (emojiObj: any) => {
    const emoji = emojiObj.native;
    setMessage(message + emoji);
  };

  const handleCancelUpdate = () => {
    setMessage("");
    dispatch(cancelUpdate());
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
  return (
    // TODO: when window width > mobile width, show chat panel and settings if message panel is active page
    // grid minmax(auto,max-content)
    <section
      className={`grid w-full grid-rows-[50px_auto_minmax(auto,max-content)] bg-gray-100 md:relative md:order-2`}
    >
      {!chatInfo ? (
        <section className="font-base absolute left-[25%] top-[45%] flex h-[100px] w-[300px] items-center justify-center font-roboto text-xl shadow md:left-[35%] md:top-[50%]">
          Select chat to see messages
        </section>
      ) : (
        <>
          <ChatInfo windowWidth={windowWidth} />
          <Messages />
          {showEmojis && (
            <section className={`absolute right-12 z-50`}>
              <Picker
                data={data}
                onEmojiSelect={getEmoji}
                emojiSize={18}
                previewPosition={"none"}
                theme={"light"}
              />
            </section>
          )}

          <form
            className={`flex items-end justify-center border-t px-2 py-2 `}
            onSubmit={sendMessage}
          >
            <section className="relative m-0 flex w-full p-0">
              <TextareaAutoResize
                className={`w-full resize-none border bg-gray-100 py-2 pl-2 pr-10 text-base text-zinc-700 outline-none active:outline-none md:px-9`}
                value={message}
                maxRows={3}
                onChange={handleOnChange}
                onKeyDown={onKeyDown}
                placeholder="Write a message..."
                id="textarea"
              />
              {windowWidth > 1000 && (
                <FontAwesomeIcon
                  icon={faFaceSmile}
                  className="absolute bottom-3 right-4 cursor-pointer text-gray-400"
                  onClick={handleShowEmoji}
                />
              )}
            </section>

            {updateMsg ? (
              <button
                type="submit"
                onClick={handleCancelUpdate}
                className="ml-2  flex w-fit items-center justify-center rounded-lg bg-orange-600 p-2 text-white hover:bg-orange-700 active:bg-orange-900"
              >
                Cancel
              </button>
            ) : null}
            <button
              type="submit"
              className="ml-2 flex h-[38px] w-[36px] items-center justify-center rounded-lg bg-blue-600 p-2 hover:bg-blue-700 active:bg-blue-900"
            >
              <FontAwesomeIcon icon={faPaperPlane} className="text-white" />
            </button>
          </form>
        </>
      )}
    </section>
  );
};
export default MessagePanel;
