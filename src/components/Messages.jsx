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
        () => messages.map((msg) => (

            <>
                {
                    addDateToSet(messageHeaderDate(msg.msgDate)) &&
                    <MessageHeaderDate
                        messageDate={messageHeaderDate(msg.msgDate)}
                    />
                }
                < Message
                    key={msg.Id}
                    msgId={msg.Id}
                    message={msg.message}
                    sender={msg.sender}
                    msgDate={msg.msgDate}
                    info={msg.info}
                    userId={chatInfo?.userId}
                />
            </>
        )),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [messages]
    );

    return (
        <section ref={messagesRef} className="flex w-full overflow-y-auto py-2 row-span-5 flex-col mt-[60px]">
            {
                messages.length < 1 ? <section className='absolute shadow w-[300px] h-[100px] font-rale font-base text-xl flex justify-center items-center md:top-[50%] md:left-[35%] top-[45%] left-[15%]'>
                    No Messages found
                </section> : memoizedMessages
            }
        </section>
    );
};

export default Messages;
