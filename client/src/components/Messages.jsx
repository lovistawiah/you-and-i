import { Textarea } from '@chakra-ui/react'
import SendIcon from './react-svg/SendIcon'
import Dp from '../images/user-dp.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowLeft, faArrowRight, faChevronLeft, faDownLeftAndUpRightToCenter } from '@fortawesome/free-solid-svg-icons'
const Messages = ({ panel }) => {
    const messages = []
    for (let i = 0; i < 20; i++) {
        messages.push(<section className="message">
            <section className="message-content">hello, it is me and I’m typing and it is working as expected and what do you think</section>
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
                <section className="date-box">
                    <section className="messages-date">
                        12/03/2023
                    </section>
                </section>
                {messages}
                <section className="message send">
                    <section className="message-content">hello, it is me and I’m typing and it is working as expected and what do you think</section>
                    <section className="message-status">Delivered</section>
                </section>
            </section>
            {/* send message box */}

            <form action="" className="send-message">
                <Textarea placeholder="this is my placeholder" resize="none" ></Textarea>
                <button>
                    <SendIcon />
                </button>
            </form>
        </section>
    )
}
export default Messages

