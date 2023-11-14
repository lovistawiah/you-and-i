import { useEffect, useState } from 'react'
import { socket } from '../socket'
import { useSelector } from 'react-redux'
import TextareaAutoResize from 'react-textarea-autosize'
import Dp from '../images/user-dp.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { messageEvents } from '../utils/eventNames'

const Messages = () => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState()
    const chatInfo = useSelector(state => state.chatInfo.value)

    const sendMessage = (e) => {
        const { userId, channelId } = chatInfo
        e.preventDefault()
        if (!message) return
        // emitting to old channel
        if (channelId && userId) {
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
    useEffect(() => {
        socket.emit(messageEvents.displayChannelAllMessages, chatInfo?.channelId, (response) => {
            console.log(response)
        })
    }, [messages])
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

            <section className="messages">
                <p className="messages-date">
                    12/03/2023
                </p>
                <section className="message sender">
                    <section className="message-content">hello, it is me and I’m typing and it is working as expected and what do you think</section>
                    <section className="message-status">Delivered</section>
                </section>
            </section>
            {/* send message box */}

            <form className="send-message" onSubmit={sendMessage}>
                <TextareaAutoResize className='textarea' maxRows={3} value={message} onChange={(e) => setMessage(e.target.value)} />
                <button>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </form>
        </section>
    )
}
export default Messages

