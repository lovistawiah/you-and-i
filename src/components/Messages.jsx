import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'

import Message from "./Message";
import { socket } from "../socket";
import { msgEvents } from "../utils/eventNames";
import { messageHeaderDate } from "../utils/compareDate";
import MessageHeaderDate from "./MessageHeaderDate"
import { updateLastMessage } from "../app/chatsSlice";
import { addMessage } from "../app/messagesSlice";
import { updateNewChat } from "../app/chatSlice";

const Messages = () => {
    const info = useSelector((state) => state.chat.value);
    const messages = useSelector((state) => state.messages.messages)
    const dispatch = useDispatch()
    const [chatInfo, setChatInfo] = useState(info)
    const datesSet = new Set()
    const messagesRef = useRef(null)

    const addDateToSet = (messageDate) => {
        if (!datesSet.has(messageDate)) {
            datesSet.add(messageDate)
            return true
        }
        return false
    }

    useEffect(() => {
        const getMessages = (messagesData) => {
            dispatch(addMessage(messagesData))
        };
        socket.emit(msgEvents.msgs, chatInfo?.chatId);
        socket.on(msgEvents.msgs, getMessages);

        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });

        return () => {
            socket.off(msgEvents.msgs, getMessages);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatInfo])


    useEffect(() => {
        setChatInfo(info)
        datesSet.clear()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [info])


    useEffect(() => {
        const handleSendMessage = (msg) => {
            console.log(msg)
            dispatch(updateLastMessage({ chatId: msg.chatId, lastMessage: msg.message, msgDate: msg.msgDate }))
            dispatch(addMessage(msg))
            dispatch(updateNewChat({ chatId: msg.chatId, userId: info.userId }))
        }
        socket.on(msgEvents.sndMsg, handleSendMessage)
        return () => {
            socket.off(msgEvents.sndMsg, handleSendMessage)
        }
    })

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight
        }
    }, [messages])

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
