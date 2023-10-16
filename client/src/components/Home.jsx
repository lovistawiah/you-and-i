import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/style.css'
import MessagesIcon from './react-svg/MessagesIcon'
import SettingsIcon from './react-svg/SettingsIcon'
import SearchIcon from './react-svg/SearchIcon'
import ArrowDownIcon from './react-svg/ArrowDownIcon'
import SendIcon from './react-svg/SendIcon'
import Dp from '/images/ellipse-2.png'
const Home = () => {
    const [bodyWidth, setBodyWidth] = useState(document.body.clientWidth)
    const chats = []
    for (let i = 0; i < 20; i++) {
        chats.push(
            <Link className='link'>
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

    const handleResize = () => {
        setBodyWidth(document.body.clientWidth)
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize)
      
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [bodyWidth])

    return (
        <section className="home-page">
            <section className="icon-panel">
                <Link>
                    <MessagesIcon />
                </Link>
                <Link>
                    <SettingsIcon />
                </Link>
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

        </section>
    )
}
export default Home