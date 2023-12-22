import { useEffect, useState } from 'react'
import { socket } from '../socket'

import TextareaAutoResize from 'react-textarea-autosize'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { messageEvents } from '../utils/eventNames'
import Messages from './Messages'
import { useSelector } from 'react-redux'
import ChatInfo from './ChatInfo'

const MessagePanel = () => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const chatInfo = useSelector((state) => state.chatInfo.value);


    useEffect(() => {
        const getMessages = (messagesData) => {
            setMessages(messagesData)
        }
        socket.emit(messageEvents.channelMessages, chatInfo.channelId);
        socket.on(messageEvents.channelMessages, getMessages)

    }, [chatInfo.channelId])


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
        <section className="w-full h-[50px] flex bg-white flex-col justify-start items-start">
            <ChatInfo
                avatarUrl={chatInfo.avatarUrl}
                onlineStatus={"online"}
                username={chatInfo.username}
            />
            <Messages
                messages={messages}
                userId={chatInfo.userId}
            />
            <form className="fixed bottom-0 p-1 min-h-[50px] max-h-[90px] w-full flex items-end justify-between bg-white" onSubmit={sendMessage}>
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

