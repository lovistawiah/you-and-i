import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from 'react-redux'

import Message from "./Message";
import { socket } from "../socket";
import { messageEvents } from "../utils/eventNames";
import { messageHeaderDate } from "../utils/compareDate";
import MessageHeaderDate from "./MessageHeaderDate"

const Messages = () => {
    const info = useSelector((state) => state.chat.value);
    const [chatInfo, setChatInfo] = useState(info)
    const datesSet = new Set()
    const messagesRef = useRef(null)
    const [messages, setMessages] = useState([])

    const addDateToSet = (messageDate) => {
        if (!datesSet.has(messageDate)) {
            datesSet.add(messageDate)
            return true
        }
        return false
    }
    useEffect(() => {
        const getMessages = (messagesData) => {
            setMessages(messagesData)
        };
        socket.emit(messageEvents.channelMessages, chatInfo?.channelId);
        socket.on(messageEvents.channelMessages, getMessages);

        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });

        return () => {
            socket.off(messageEvents.channelMessages, getMessages);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatInfo])
    // clear messages data before rendering
    useEffect(() => {
        setMessages([])
        setChatInfo(info)
        datesSet.clear()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [info])


    useEffect(() => {
        const handleSendMessage = (data) => {
            setMessages((prevMessages) => [...prevMessages, data])
        }
        socket.on(messageEvents.sendMessage, handleSendMessage)
        return () => {
            socket.off(messageEvents.sendMessage, handleSendMessage)
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
                    //FIXME: make message header date render correctly
                    addDateToSet(messageHeaderDate(msg.createdAt)) &&
                    <MessageHeaderDate
                        messageDate={messageHeaderDate(msg.createdAt)}
                    />
                }
                < Message
                    key={msg._id}
                    message={msg.message}
                    sender={msg.sender}
                    createdAt={msg.createdAt}
                    userId={chatInfo.userId}
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
