import TextareaAutoResize from 'react-textarea-autosize'
import { useRef, useState, useEffect, useMemo } from 'react'
import { faFaceSmile, faPaperPlane, faPaperclip } from '@fortawesome/free-solid-svg-icons'
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
        socket.emit(messageEvents.channelMessages, chatInfo?.channelId);
        socket.on(messageEvents.channelMessages, getMessages);

        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });

        return () => {
            socket.off(messageEvents.channelMessages, getMessages);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <section className="h-screen w-full grid grid-rows-5 bg-gray-50 order-2 md:w-full border-r-8 border-green-950 md:relative">

            <ChatInfo
                avatarUrl={"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/951.jpg"}
                onlineStatus={"online"}
                username={"Lovis"}
            />
            {/* messages */}
            <section ref={messagesRef} className="flex w-full overflow-y-auto py-2 row-span-5 flex-col ">
                {
                    memoizedMessages

                }
            </section>
            {/* end of messages */}

            {/* form  */}
            <form ref={formRef}
                className="bg-white flex items-end py-2 justify-center px-2" onSubmit={sendMessage}>
                <section className='bg-blue-500 w-full p-0 m-0 relative flex'>
                    <FontAwesomeIcon icon={faPaperclip} className='absolute left-3 top-3 text-gray-400' />
                    <TextareaAutoResize className='resize-none md:px-9 pl-8 pr-10 py-2 text-sm text-zinc-700 w-[100%] h-full active:outline-none border outline-none bg-white'
                        value={message}
                        maxRows={3}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={onKeyDown}
                        placeholder='Write a message...'
                    />
                    <FontAwesomeIcon icon={faFaceSmile} className='absolute right-4 top-3 text-gray-400' />
                </section>
                <button type='submit' className='w-[36px] h-[38px] p-2 bg-blue-600 rounded-lg justify-center items-center ml-2 active:bg-blue-900 hover:bg-blue-700 flex'>
                    <FontAwesomeIcon icon={faPaperPlane} className='text-white' />
                </button>
            </form>
            {/* end of form */}

        </section>
    )
};
export default MessagePanel
