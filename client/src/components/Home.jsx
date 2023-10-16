import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/style.css'
import MessagesIcon from './react-svg/MessagesIcon'
import SettingsIcon from './react-svg/SettingsIcon'
import Messages from './Messages'
import Chats from './Chats'
const Home = () => {
    const [bodyWidth, setBodyWidth] = useState(document.body.clientWidth)
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
            {
                bodyWidth < 485 ? (
                    <Chats />
                ) : (
                    <>
                        <Chats />
                        <Messages />
                    </>
                )
            }
        </section>
    )
}
export default Home