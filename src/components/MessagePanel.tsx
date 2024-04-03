// eslint-disable-next-line import/default
import data from "@emoji-mart/data";
import { init } from "emoji-mart";
import Picker from "@emoji-mart/react";
import { faFaceSmile, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextareaAutoResize from "react-textarea-autosize";
import ChatInfo from "./ChatInfo";
import Messages from "./Messages";
import useMessagePanel from "../hooks/useMessagePanel";

const MessagePanel = () => {
  const {
    getEmoji,
    handleCancelUpdate,
    handleOnChange,
    handleShowEmoji,
    onKeyDown,
    windowWidth,
    showEmojis,
    message,
    chatInfo,
    updateMsg,
    submitForm,
  } = useMessagePanel();

  void init({ data });
  return (
    <section
      className={`grid h-full w-full grid-rows-[50px_auto_minmax(auto,max-content)] bg-gray-100 md:relative md:order-2`}
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

          <form className={`flex items-end justify-center border-t px-2 py-2 `}>
            <section
              className="relative m-0 flex w-full p-0"
              onSubmit={submitForm}
            >
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
