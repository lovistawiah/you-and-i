import { useEffect, useState } from 'react'
import { socket } from '../socket'
import { useSelector } from 'react-redux'
import TextareaAutoResize from 'react-textarea-autosize'
import Dp from '../images/user-dp.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { messageEvents } from '../utils/eventNames'
import { messageHeaderDate, messageStatus } from '../utils/compareDate'

const MessagePanel = () => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState()
    const [messageDate, setMessageDate] = useState()
    // const [newMessageHeaderDate, setNewMessageHeaderDate] = useState(false)
    const chatInfo = useSelector(state => state.chatInfo.value)
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

    useEffect(() => {
        const formattedDate = messageHeaderDate(messageDate)
        if (!formattedDate) return
        const dateList = document.querySelectorAll('.message-date')
        if(dateList.length <= 0) return
        const lastDateItem = dateList[dateList.length -1]
        console.log('hello')

    }, [messageDate]);

    useEffect(() => {
        socket.emit(messageEvents.displayChannelAllMessages,
            chatInfo?.channelId,
            (response) => {
                setMessages(response)
            })
    }, [])


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
export default MessagePanel

