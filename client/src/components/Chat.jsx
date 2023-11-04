
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faComments, faGear, faMagnifyingGlass, faMessage } from '@fortawesome/free-solid-svg-icons'
import '../styles/style.css'

import Dp from '../images/user-dp.png'
import Messages from './Messages'
import { useState } from 'react'

const Chats = () => {
    const [panel, showPanel] = useState('chats')
    const handleClick = () => {
        showPanel('messages')
    }
    const controlPanelDisplay = () => {
        showPanel('chats')
    }
    const chats = []
    for (let i = 0; i < 20; i++) {
        chats.push(
            <Link className="chat" onClick={handleClick}>
                <section className="picture-frame">
                    <img src={Dp} alt="user dp" />
                </section>
                <section className="user-info">
                    <section className="username-and-time">
                        <p className="username">Lovis Tawiah</p>
                        <p className="last-message-time">11:30 pm
                        </p>
                    </section>

                    <p className="last-message">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ipsum esse eius voluptatibus consequatur, ipsam quibusdam et eligendi corrupti doloremque eos, sint nulla temporibus nam facilis alias veritatis sed incidunt?
                    </p>

                </section>
            </Link>
        )
    }
    return (
        <>
            <section className="chats-panel" style={{ display: panel != 'chats' ? 'none' : '' }}>
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
                <div className="menu">
                    <FontAwesomeIcon icon={faGear} />
                    <FontAwesomeIcon icon={faComments} />
                </div>
            </section>
            <Messages panel={panel} />
        </>
    )
}
export default Chats