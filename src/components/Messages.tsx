import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import { messageHeaderDate } from "../utils/compareDate";
import MessageHeaderDate from "./MessageHeaderDate";
import useMessages from "../hooks/useMessages";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { replyMessage } from "../app/messagesSlice";
import { State } from "../interface/state";

const Messages = () => {
  //info holds userId
  const dispatch = useDispatch();
  const info = useSelector((state: State) => state.chat.value);
  const messages = useSelector((state: State) => state.messages.messages);
  const msgToBeReplied = useSelector(
    (state: State) => state.messages.msgToBeReplied,
  );

  const [chatInfo, setChatInfo] = useState(info);
  const datesSet = new Set();
  const messagesRef = useRef(null);
  useMessages({
    chatId: chatInfo?.chatId,
    messagesRef: messagesRef,
  });
  const addDateToSet = (messageDate: string) => {
    if (!datesSet.has(messageDate)) {
      datesSet.add(messageDate);
      return true;
    }
    return false;
  };

  useEffect(() => {
    setChatInfo(info);
    datesSet.clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info]);

  const memoizedMessages: ReactNode = useMemo(
    () =>
      messages.map((message) => (
        <>
          {addDateToSet(messageHeaderDate(message.createdAt)) && (
            <MessageHeaderDate
              messageDate={messageHeaderDate(message.createdAt)}
            />
          )}
          <Message
            key={message.Id}
            Id={message.Id}
            message={message.message}
            sender={message.sender}
            msgDate={
              new Date(message.updatedAt.getTime()) >
              new Date(message.createdAt.getTime())
                ? message.updatedAt
                : message.createdAt
            }
            info={message.info}
            userId={chatInfo?.userId}
            reply={message?.reply}
          />
        </>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [messages],
  );
  const clearModal = () => {
    dispatch(replyMessage(null));
  };
  return (
    <section
      ref={messagesRef}
      className={`relative overflow-y-auto`}
      id="messages"
    >
      {msgToBeReplied && (
        <Modal>
          <section
            className={`flex w-full items-start justify-between bg-gray-300 p-1 font-roboto text-base font-normal leading-normal`}
          >
            <div>{msgToBeReplied.message}</div>
            <FontAwesomeIcon
              icon={faClose}
              onClick={clearModal}
              className="cursor-pointer rounded border p-1 text-lg text-gray-600 hover:bg-gray-300 active:bg-gray-600"
            />
          </section>
        </Modal>
      )}
      {messages.length < 1 ? (
        <section className="font-base absolute left-[15%] top-[45%] flex h-[100px] w-[300px] items-center justify-center font-roboto text-xl shadow md:left-[35%] md:top-[50%]">
          No Messages found
        </section>
      ) : (
        <div
          className={` ${msgToBeReplied ? "blur-[2px]" : ""} flex w-full  flex-col py-2`}
        >
          {memoizedMessages}
        </div>
      )}
    </section>
  );
};

export default Messages;
