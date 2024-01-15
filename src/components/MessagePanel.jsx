import TextareaAutoResize from 'react-textarea-autosize'
import { useRef, useState, useEffect, useMemo } from 'react'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { socket } from '../socket'

import { messageEvents } from '../utils/eventNames'
import ChatInfo from './ChatInfo'
import Message from './Message'


const MessagePanel = () => {
    const formRef = useRef()
    const messagesRef = useRef(null)
    const chatInfo = useSelector((state) => state.chatInfo.value);
    const [marginBottom, setMarginBottom] = useState(50)

    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')

    const submitForm = (e) => {
        e.preventDefault()
        const { userId } = chatInfo
        if (!message) return
        if (userId) {
            const messageObj = {
                userId,
                message
            }
            socket.emit(messageEvents.sendMessage, messageObj)
        }
        setMessage("")
    }

    const onKeyDown = (e) => {
        if (e.key == "Enter" && !e.shiftKey) {
            submitForm(e)
        }
    }

    const sendMessage = (e) => {
        submitForm(e)
    }
    useEffect(() => {
        const getMessages = (messagesData) => {
            setMessages(messagesData)
        };
        socket.emit(messageEvents.channelMessages, chatInfo.channelId);
        socket.on(messageEvents.channelMessages, getMessages);

        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });

        return () => {
            socket.off(messageEvents.channelMessages, getMessages);
        };
    }, [])

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
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }, [messages])
    useEffect(() => {
        const offsetHeight = formRef.current.offsetHeight
        setMarginBottom(offsetHeight)
    }, [marginBottom])
    const memoizedMessages = useMemo(
        () => messages.map((messageInfo) => (
            <Message
                key={messageInfo._id}
                message={messageInfo.message}
                sender={messageInfo.sender}
                createdAt={messageInfo.createdAt}
                userId={chatInfo.userId}
            />
        )),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [messages]
    );


    return (
        <section className="w-full h-screen grid grid-rows-5">

            <ChatInfo
                avatarUrl={chatInfo.avatarUrl}
                onlineStatus={"online"}
                username={chatInfo.username}
            />
            {/* messages */}
            <section ref={messagesRef} className="flex w-full overflow-y-auto mt-[50px] py-2 row-span-5 flex-col">
                {
                    memoizedMessages

                }
            </section>
            {/* end of messages */}

            {/* form  */}
            <form ref={formRef}
                className="fixed bottom-0 p-1  pl-4 min-h-[50px] max-h-[90px] w-full flex items-end  justify-start row-span-1 border border-t" onSubmit={sendMessage}>
                <TextareaAutoResize className='resize-none px-1 py-1 text-sm text-zinc-700 w-[80%] active:outline-none border rounded border-zinc-600 outline-none focus:border-zinc-700'
                    value={message}
                    maxRows={3}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={onKeyDown}
                />
                <button type='submit' className='w-[28px] h-[28px] p-1 bg-blue-600 rounded-[50px] justify-center items-center ml-2 active:bg-blue-900 hover:bg-blue-700 flex'>
                    <FontAwesomeIcon icon={faPaperPlane} className='text-white' />
                </button>
            </form>
            {/* end of form */}

        </section>
    )
};
export default MessagePanel
