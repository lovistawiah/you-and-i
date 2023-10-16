import SendIcon from './react-svg/SendIcon'
import Dp from '../public/images/user-dp.png'
const Messages = () => {
    return (
        <section className="messages-panel">
            <section className="chat-info">
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
                <section className="message">
                    <section className="message-content">hello, it is me and I’m typing and it is working as expected and what do you think</section>
                    <section className="message-status">Delivered</section>
                </section>
                <section className="message send">
                    <section className="message-content">hello, it is me and I’m typing and it is working as expected and what do you think</section>
                    <section className="message-status">Delivered</section>
                </section>
            </section>
            {/* send message box */}
            <form action="" className="send-message">
                <textarea onKeyUp={(e) => {
                    e.target.style.height = '31px'
                    let height = e.target.scrollHeight
                    height += 1
                    e.target.style.height = `${height}px`
                }} className="message-box" name="" id="" ></textarea>
                <button>
                    <SendIcon />
                </button>
            </form>
        </section>
    )
}
export default Messages