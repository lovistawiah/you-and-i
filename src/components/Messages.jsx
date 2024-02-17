import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Message from "./Message";
import { messageHeaderDate } from "../utils/compareDate";
import MessageHeaderDate from "./MessageHeaderDate"
import useMessages from "../hooks/useMessages";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { replyMessage } from "../app/messagesSlice";

const Messages = () => {
    //info holds userId
    const dispatch = useDispatch()
    const info = useSelector((state) => state.chat.value);
    const messages = useSelector((state) => state.messages.messages)
    const msgToBeReplied = useSelector((state) => state.messages.msgToBeReplied)

    const [chatInfo, setChatInfo] = useState(info)
    const datesSet = new Set()
    const messagesRef = useRef(null)
    useMessages({ chatId: chatInfo?.chatId, messagesRef: messagesRef, userId: info?.userId })
    const addDateToSet = (messageDate) => {
        if (!datesSet.has(messageDate)) {
            datesSet.add(messageDate)
            return true
        }
        return false
    }

    useEffect(() => {
        setChatInfo(info)
        datesSet.clear()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [info])

    const memoizedMessages = useMemo(
        () => messages.map((message) => (

            <>
                {
                    addDateToSet(messageHeaderDate(message.createdAt)) &&
                    <MessageHeaderDate
                        messageDate={messageHeaderDate(message.createdAt)}
                    />
                }
                < Message
                    key={message.Id}
                    msgId={message.Id}
                    message={message.message}
                    sender={message.sender}
                    msgDate={new Date(message.updatedAt) > new Date(message.createdAt) ? message.updatedAt : message.createdAt}
                    info={message.info}
                    userId={chatInfo?.userId}
                />
            </>
        )),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [messages]
    );
    const clearModal = () => {
        dispatch(replyMessage(null))
    }
    return (
        <section ref={messagesRef} className={`overflow-y-auto relative`} id="messages">
            {
                msgToBeReplied && <Modal>
                    <section className={`font-normal leading-normal font-roboto text-base w-full flex items-start justify-between p-1 bg-gray-300`}>
                        <div>{msgToBeReplied.message}</div>
                        <FontAwesomeIcon icon={faClose} onClick={clearModal} className="text-gray-600 hover:bg-gray-300 active:bg-gray-600 p-1 rounded border cursor-pointer text-lg" />
                    </section >
                </Modal >
            }
            {
                messages.length < 1 ? <section className='absolute shadow w-[300px] h-[100px] font-roboto font-base text-xl flex justify-center items-center md:top-[50%] md:left-[35%] top-[45%] left-[15%]'>
                    No Messages found
                </section> : <div className={` ${msgToBeReplied ? 'blur-[2px]' : ''} flex w-full  py-2 flex-col`}>
                    {memoizedMessages}
                </div>
            }
        </section >
    );
};

export default Messages;
