import { useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux'

import Message from "./Message";
import { socket } from "../socket";
import { messageEvents } from "../utils/eventNames";

const Messages = ({ formSubmitted }) => {
    console.log(formSubmitted)
    // console.log(formRef)
    // const messagesMarginBottom = formRef.current.offsetHeight
    const chatInfo = useSelector((state) => state.chatInfo.value);
    const messagesRef = useRef(null)
    const [messages, setMessages] = useState([])
    useEffect(() => {
        const getMessages = (messagesData) => {
            if (!messagesData) return;
            setMessages(messagesData);
        };
        socket.emit(messageEvents.channelMessages, chatInfo.channelId);
        socket.on(messageEvents.channelMessages, getMessages);

        socket.on('error', (error) => {
            // TODO: fix socket error
            console.error('Socket error:', error);
        });

        return () => {
            socket.off(messageEvents.channelMessages, getMessages);
            socket.off('error');
        };
    }, [chatInfo.channelId]);
    useEffect(() => {
        socket.on(messageEvents.sendMessage, (data) => {
            if (!data) return
            console.log(data)
            setMessages(() => {
                let updatedMessages = [...messages, data]
                console.log(updatedMessages.length)
                return updatedMessages
            })
        })
        return () => {
            socket.off(messageEvents.sendMessage)
        }
    }, [formSubmitted])
    useEffect(() => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }, [messages])
    return (
        <section ref={messagesRef} className="flex w-full overflow-y-auto mt-[50px] py-2 row-span-5 flex-col">
            {
                messages?.map((messageInfo) => (
                    <Message
                        key={messageInfo._id}
                        message={messageInfo.message}
                        sender={messageInfo.sender}
                        createdAt={messageInfo.createdAt}
                        userId={chatInfo.userId}
                    />
                ))

            }
        </section>
    );
};

export default Messages;
