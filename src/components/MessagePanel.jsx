import { useEffect, useState } from 'react'
import { socket } from '../socket'

import TextareaAutoResize from 'react-textarea-autosize'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { messageEvents } from '../utils/eventNames'
import Messages from './Messages'
import { useSelector } from 'react-redux'

const MessagePanel = () => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    // const [singleMessage, setSingleMessage] = useState({})
    const chatInfo = useSelector((state) => state.chatInfo.value);


    useEffect(() => {
        const getMessages = (messagesData) => {
            setMessages(messagesData)
        }

        socket.emit(messageEvents.displayChannelAllMessages, chatInfo?.channelId, getMessages);

        return () => {
            socket.off(messageEvents.displayChannelAllMessages, getMessages)
        }
    }, [chatInfo?.channelId])

    useEffect(() => {
        socket.on(messageEvents.sendMessage, (data) => {
            console.log(data)
            setSingleMessage(data)
        })
    }, [])
// FIXME: sent message that return.
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

    return (
        <section className="messages-panel">
            <section className="chat-info">
                <FontAwesomeIcon icon={faChevronLeft} />
                <section className="chat-dp">
                    <img src={chatInfo.avatarUrl} alt="user db" />
                </section>
                <section className="chat-username-status">
                    <section className="chat-username">{chatInfo.username}</section>
                    <section className="chat-status">Online</section>
                </section>
            </section>
            <Messages
                messages={messages}
                userId={chatInfo?.userId}
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

