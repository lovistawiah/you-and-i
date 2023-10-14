import '../styles/style.css'
import MessagesIcon from './react-svg/MessagesIcon'
import SettingsIcon from './react-svg/SettingsIcon'
import SearchIcon from './react-svg/SearchIcon'
import ArrowDownIcon from './react-svg/ArrowDownIcon'
import SendIcon from './react-svg/SendIcon'
import Dp from '/images/ellipse-2.png'
const Home = () => {
    const chats = []
    for (let i = 0; i < 20; i++) {
        chats.push(<section className="chat">
            <section className="picture-frame">
                <img src={Dp} alt="user dp" />
            </section>
            <section className="user-info">
                <section className="username-and-time">
                    <section className="username">Lovis Tawiah</section>
                    <section className="last-message-time">11:30 pm</section>
                </section>
                <section className="last-message">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ipsum esse eius voluptatibus consequatur, ipsam quibusdam et eligendi corrupti doloremque eos, sint nulla temporibus nam facilis alias veritatis sed incidunt?
                </section>
            </section>
        </section>)
    }
    return (
        <section className="home-page">
            <section className="icon-panel">
                <MessagesIcon />
                <SettingsIcon />
            </section>
            <section className="chats-panel">
                <div className="search-box">
                    <section className="search-holder">
                        <SearchIcon />
                        <input type="text" name="" placeholder='Search' id="" />
                    </section>
                </div>
                <section className="chats-text-container">
                    <section className="chats-text">Chats</section>
                    <ArrowDownIcon />
                </section>
                <section className="chats">
                    {chats}
                </section>
            </section>
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
                    <textarea onKeyUp={(e)=> {
                        e.target.style.height = '31px'
                        let height = e.target.scrollHeight
                        height += 1
                        e.target.style.height = `${height}px`
                    }} className="message-box" name="" id="" ></textarea>
                    <button>
                        <SendIcon/>
                    </button>
                </form>
            </section>
            
        </section>
    )
}
export default Home