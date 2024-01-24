import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { faFaceSmile, faPaperPlane, faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import TextareaAutoResize from 'react-textarea-autosize'
import { socket } from '../socket'

import { messageEvents } from '../utils/eventNames'
import ChatInfo from './ChatInfo'
import Message from './Message'

const MessagePanel = () => {
    const messagesRef = useRef(null)
    const info = useSelector((state) => state.chatInfo.value);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [showEmojis, setShowEmojis] = useState(false)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [chatInfo, setChatInfo] = useState(info)
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
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight
        }
    }, [messages])

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
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.innerWidth])

    useEffect(() => {
        setChatInfo(info)
    }, [info])

    const handleShowEmoji = () => {
        setShowEmojis(showEmojis ? false : true)
    }

    const getEmoji = (emojiObj) => {
        const emoji = emojiObj.native
        setMessage(message + emoji)
    }
    return (

        <section className="h-screen w-full grid grid-rows-5 bg-gray-100 order-2  border-green-950 md:relative">
            {
                !chatInfo ? <section className='absolute shadow w-[300px] h-[100px] font-rale font-base text-xl flex justify-center items-center md:top-[50%] md:left-[35%] top-[45%] left-[25%]'>
                    Select chat to see messages
                </section> : <>
                    <ChatInfo
                        avatarUrl={chatInfo?.avatarUrl}
                        onlineStatus={chatInfo?.onlineStatus}
                        username={chatInfo?.username}
                        windowWidth={windowWidth}
                    />
                    <section ref={messagesRef} className="flex w-full overflow-y-auto py-2 row-span-5 flex-col ">
                        {
                            messages.length < 1 ? <section className='absolute shadow w-[300px] h-[100px] font-rale font-base text-xl flex justify-center items-center md:top-[50%] md:left-[35%] top-[45%] left-[15%]'>
                                No Messages found
                            </section> : memoizedMessages
                        }
                    </section>
                    {
                        showEmojis && <section className={`absolute z-50 bottom-[90px] right-12`}>
                            <Picker data={data} onEmojiSelect={getEmoji} emojiSize={18} previewPosition={"none"} theme={"light"} />
                        </section>
                    }

                    <form
                        className="bg-white flex items-end py-2 justify-center px-2 border-t " onSubmit={sendMessage}>
                        <section className='bg-blue-500 w-full p-0 m-0 relative flex'>
                            <FontAwesomeIcon icon={faPaperclip} className='absolute left-3 bottom-3 text-gray-400' />
                            <TextareaAutoResize className={`resize-none md:px-9 pl-8 pr-10 py-2 text-base text-zinc-700 w-[100%] h-full active:outline-none border outline-none bg-gray-100`}
                                value={message}
                                maxRows={3}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={onKeyDown}
                                placeholder='Write a message...'
                            />
                            {
                                windowWidth > 1000 && <FontAwesomeIcon icon={faFaceSmile} className='absolute right-4 bottom-3 text-gray-400' onClick={handleShowEmoji} />
                            }
                        </section>
                        <button type='submit' className='w-[36px] h-[38px] p-2 bg-blue-600 rounded-lg justify-center items-center ml-2 active:bg-blue-900 hover:bg-blue-700 flex'>
                            <FontAwesomeIcon icon={faPaperPlane} className='text-white' />
                        </button>
                    </form>
                </>
            }
        </section>


    )
};
export default MessagePanel
