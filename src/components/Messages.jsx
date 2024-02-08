import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from 'react-redux'
import Message from "./Message";
import { messageHeaderDate } from "../utils/compareDate";
import MessageHeaderDate from "./MessageHeaderDate"
import useMessages from "../hooks/useMessages";

const Messages = () => {
    //info holds userId
    const info = useSelector((state) => state.chat.value);
    const messages = useSelector((state) => state.messages.messages)

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

    return (
        <section ref={messagesRef} className="flex w-full overflow-y-auto py-2 row-start-2 row-end-6 col-span-1 col-start-1 col-end-2 flex-col">
            {
                messages.length < 1 ? <section className='absolute shadow w-[300px] h-[100px] font-rale font-base text-xl flex justify-center items-center md:top-[50%] md:left-[35%] top-[45%] left-[15%]'>
                    No Messages found
                </section> : memoizedMessages
            }
        </section>
    );
};

export default Messages;
