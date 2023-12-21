import { useEffect, useState } from 'react'
import { socket } from '../socket'

import TextareaAutoResize from 'react-textarea-autosize'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPaperPlane } from '@fortawesome/free-solid-svg-icons'
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
        <section className="w-full h-[50px] flex flex-col justify-between alignstat">
            <ChatInfo
                avatarUrl={chatInfo.avatarUrl}
                onlineStatus={"online"}
                username={chatInfo.username}
            />
            <Messages
                messages={messages}
                userId={chatInfo.userId}
            />
            <form className="send-message" onSubmit={sendMessage}>
                <TextareaAutoResize
                    className='textarea'
                    value={message}
                    maxRows={3}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={onKeyDown}
                />
                <button type='submit'>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </form>
        </section>
    )
}
export default MessagePanel

