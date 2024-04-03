import { ReactNode, useMemo } from "react";
import Message from "./Message";
import { messageHeaderDate } from "../utils/compareDate";
import MessageHeaderDate from "./MessageHeaderDate";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import useMessages from "../hooks/useMessages";

const Messages = () => {
  const { addDateToSet, messages, messagesRef, msgToBeReplied, clearModal } =
    useMessages();

  const memoizedMessages: ReactNode = useMemo(
    () =>
      messages?.map((message) => (
        <>
          {addDateToSet(messageHeaderDate(message.createdAt)) && (
            <MessageHeaderDate
              messageDate={messageHeaderDate(message.createdAt)}
            />
          )}
          <Message
            key={message.id}
            id={message.id}
            message={message.message}
            sender={message.sender}
            createdAt={message.createdAt}
            updatedAt={message.updatedAt}
            info={message.info}
            // userId={chatInfo?.userId}
            reply={message.reply}
          />
        </>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [messages],
  );
  return (
    <div ref={messagesRef} className={`relative overflow-y-auto`} id="messages">
      {msgToBeReplied && (
        <Modal>
          <section
            className={`flex w-full items-start justify-between bg-gray-300 p-1 font-roboto text-base font-normal leading-normal`}
          >
            <div>{/*{message to be replied} */}</div>
            <FontAwesomeIcon
              icon={faClose}
              onClick={clearModal}
              className="cursor-pointer rounded border p-1 text-lg text-gray-600 hover:bg-gray-300 active:bg-gray-600"
            />
          </section>
        </Modal>
      )}
      {messages && messages.length < 1 ? (
        <section className="font-base absolute left-[15%] top-[45%] flex h-[100px] w-[300px] items-center justify-center font-roboto text-xl shadow md:left-[35%] md:top-[50%]">
          No Messages found
        </section>
      ) : (
        <div className={` ${"blur-[2px]"} flex w-full  flex-col py-2`}>
          {memoizedMessages}
        </div>
      )}
    </div>
  );
};

export default Messages;
