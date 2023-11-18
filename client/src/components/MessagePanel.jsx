import { useEffect, useState } from 'react'
import { socket } from '../socket'

import TextareaAutoResize from 'react-textarea-autosize'
import Dp from '../images/user-dp.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { messageEvents } from '../utils/eventNames'
import Messages from './Messages'
import { useSelector } from 'react-redux'

const MessagePanel = () => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const chatInfo = useSelector((state) => state.chatInfo.value);

    useEffect(() => {
        socket.emit(messageEvents.displayChannelAllMessages, chatInfo?.channelId, (response) => {
            setMessages(response);
        });
    }, [chatInfo?.channelId]);

    const sendMessage = (e) => {
        const { userId, channelId } = chatInfo
        e.preventDefault()
        if (!message) return
        // emitting to old channel
        if (channelId && userId) {
            console.log(userId)
            const messageObj = {
                channelId,
                message
            }
            socket.emit(messageEvents.sendMessage, messageObj)
        }

        if (userId && !channelId) {
            const messageObj = {
                userId,
                message
            }
            socket.emit(messageEvents.newChannelMessage, messageObj)
        }
        setMessage("")
    }

    return (
        <section className="messages-panel">
            <section className="chat-info">
                <FontAwesomeIcon icon={faChevronLeft} />
                <section className="chat-dp">
                    <img src={Dp} alt="user db" />
                </section>

                <section className="chat-username-status">
                    <section className="chat-username"></section>
                    <section className="chat-status">Online</section>
                </section>
            </section>
            <Messages
                messages={messages}
                userId={chatInfo?.userId}
            />
            <form className="send-message" onSubmit={sendMessage}>
                <TextareaAutoResize className='textarea' maxRows={3} value={message} onChange={(e) => setMessage(e.target.value)} />
                <button>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </form>
        </section>
    )
}
export default MessagePanel

