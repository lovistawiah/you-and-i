import { Link, useNavigate } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronDown, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import '../styles/style.css'

import Dp from '../images/user-dp.png'
const Chats = () => {
    const navigate = useNavigate()
    const handleChatClick = (e) => {
        e.preventDefault()
        // navigate('/messages')
    }
    const chats = []
    for (let i = 0; i < 20; i++) {
        chats.push(
           
                <Link className="chat">
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
                </Link>
        )
    }
    return (
        <section className="chats-panel">
            <div className="search-container">
                <section className="search-holder">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input type="text" name="" placeholder='Search' id="" />
                </section>
            </div>
            <section className="chats-text-container">
                <section className="chats-text">Chats</section>
              <FontAwesomeIcon icon={faChevronDown} />
            </section>

            <section className="chats">
                {chats}
            </section>
        </section>
    )
}
export default Chats