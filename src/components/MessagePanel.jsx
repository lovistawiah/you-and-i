import { useEffect, useRef, useState } from 'react'
import { socket } from '../socket'

import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import TextareaAutoResize from 'react-textarea-autosize'
import { messageEvents } from '../utils/eventNames'
import ChatInfo from './ChatInfo'
import Messages from './Messages'

const MessagePanel = () => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [messageMarginBtm, setMessageMarginBtm] = useState(0)
    const chatInfo = useSelector((state) => state.chatInfo.value);
    const formRef = useRef(null)

    useEffect(() => {
        const getMessages = (messagesData) => {
            setMessages(messagesData)
        }
        socket.emit(messageEvents.channelMessages, chatInfo.channelId);
        socket.on(messageEvents.channelMessages, getMessages)

    }, [chatInfo.channelId])

    useEffect(() => {
        const formHeight = formRef.current.offsetHeight
        const heightMap = new Map()
        if (!heightMap.has(heightMap)) {
            heightMap.set('form-height', formHeight)
            setMessageMarginBtm(formHeight)
        }
    }, [message])
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
        socket.on(messageEvents.sendMessage, (data) => {
            console.log(data)
        })
    }

    const onKeyDown = (e) => {
        if (e.key == "Enter" && !e.shiftKey) {
            submitForm(e)
        }
    }

    const sendMessage = (e) => {
        submitForm(e)
    }

    return (
        <section className="w-full h-screen grid grid-cols-1 grid-rows-5">
            <ChatInfo
                avatarUrl={chatInfo.avatarUrl}
                onlineStatus={"online"}
                username={chatInfo.username}
            />
            <Messages
                messageMarginBtm={messageMarginBtm}
                messages={messages}
                userId={chatInfo.userId}
            />
            <form ref={formRef}
                className="fixed bottom-0 p-1 min-h-[50px] max-h-[90px] w-full flex items-end justify-between bg-green-800 row-span-1" onSubmit={sendMessage}>
                <TextareaAutoResize
                    className='resize-none w-[88%] active:outline-none border border-blue-100 outline-none focus:border-blue-200'
                    value={message}
                    maxRows={3}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={onKeyDown}
                />
                <button type='submit' className='w-[32px] h-[32px] p-1 bg-blue-600 rounded-[50px] justify-center items-center active:bg-blue-900 hover:bg-blue-700'>
                    <FontAwesomeIcon icon={faPaperPlane} className='text-white' />
                </button>
            </form>
        </section>
    )
}
export default MessagePanel

