import { Textarea } from '@chakra-ui/react'
import SendIcon from './react-svg/SendIcon'
import Dp from '../images/user-dp.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
const Messages = ({ panel }) => {
    const [textAreaHeight, setTextAreaHeight] = useState(24)
    
    let ref = useRef(null)

    useEffect(() => {
        const increaseTextAreaHeight = () => {
            const height = ref.current.offsetHeight
            setTextAreaHeight('auto')
            console.log(textAreaHeight)
            console.log(height)
        }
        increaseTextAreaHeight()
        window.addEventListener('resize', increaseTextAreaHeight)

        return () => window.addEventListener('resize', increaseTextAreaHeight)
    }, [textAreaHeight])
    const messages = []

    for (let i = 0; i < 20; i++) {
        messages.push(
            <section className="message">
                <p className="message-content">hello, it is me and I’m typing and it is working as expected and what do you think
                </p>
                <section className="message-status">Delivered</section>
            </section>)
    }
    return (

        <section className="messages-panel" style={{ display: panel == "chats" ? 'none' : '' }}>
            <section className="chat-info">
                <FontAwesomeIcon icon={faChevronLeft} />
                <section className="chat-dp">
                    <img src={Dp} alt="user db" />
                </section>

                <section className="chat-username-status">
                    <section className="chat-username">Lovis Tawiah</section>
                    <section className="chat-status">Online</section>
                </section>

            </section>

            <section className="messages">
                <p className="messages-date">
                    12/03/2023
                </p>
                {messages}
                <section className="message sender">
                    <section className="message-content">hello, it is me and I’m typing and it is working as expected and what do you think</section>
                    <section className="message-status">Delivered</section>
                </section>
            </section>
            {/* send message box */}

            <form className="send-message">
                <textarea placeholder="this is my placeholder" className='textarea' ref={ref} style={{ height: textAreaHeight == 'auto' ? textAreaHeight : `${textAreaHeight}px` }}></textarea>
                <button>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </form>
        </section>
    )
}
export default Messages

