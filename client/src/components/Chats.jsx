import { useContext } from 'react'
import { Link } from 'react-router-dom'
import ChatMessagesDisplayContext from '../utils/displayContext'
import SearchIcon from './react-svg/SearchIcon'
import ArrowDownIcon from './react-svg/ArrowDownIcon'
import Dp from '../public/images/user-dp.png'
const Chats = ({ chatsDisplay }) => {
    const [display,setDisplay] = useContext(ChatMessagesDisplayContext)
    // FIXME: when I click on a chat is should hide the chat panel and show the messages panel with the necessary data.
    // FIXME: implement dark theme
    const handleChatClick = () => {
        console.log('hello, world!')
    }
    const chats = []
    for (let i = 0; i < 20; i++) {
        chats.push(
            <Link key={i} className='link' onClick={handleChatClick}>
                <section className="chat">
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
                </section>
            </Link>
        )
    }
    return (
        <section className="chats-panel" style={{ display: chatsDisplay }}>
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
    )
}
export default Chats