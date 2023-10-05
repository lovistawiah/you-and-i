import { useEffect, useState } from 'react'
import { socket } from '../socket'
import CreateUserSvg from './react-svg/CreateUserSvg'
import Messages from './react-svg/MessagesSvg'
import Settings from './react-svg/SettingsSvg'

import Dp from '../img/user-dp.png'
import '../styles/chat-panel.css'
import { getChannels } from '../utils/channels'
const ChatPanel = () => {
    const [isConnected, setConnect] = useState(false)
    const data = getChannels()

    useEffect(() => {
        socket.on("connect", () => {
            setConnect(true)
        })
        if (socket.disconnected) {
            socket.connect()
            setConnect(false)
        }
    }, [isConnected])
    const itemElements = []
    for (let i = 0; i < 40; i++) {
        itemElements.push(<section key={i} className="chat">
            <section className="chat-pic">
                <img src={Dp} alt="user dp" className='chat-dp' />
            </section>
            <section className="chat-username-time">
                <section className="chat-username">Lovis Tawiah</section>
                <section className="chat-last-message-time">11:30 pm</section>
            </section>
            <section className="chat-last-message">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere aliquid dolorum aperiam, omnis nulla nisi et laborum! Repudiandae id voluptatibus vitae consectetur quo illo inventore excepturi, rerum, ad consequuntur similique.
            </section>
        </section>)
    }
    return (
        <>
        <section className="chat-container">
            <p>{data == null || typeof data == 'string' ? 'no channels found' : data}</p>
            <p>{isConnected ? 'connected' : 'not connected'}</p>
            <section className="search-container">
                <input type="search" name="" id="" className='search-input' placeholder='Search ' />
            </section>

            <section className="chats">
                <section className="chat-text-icon">
                    <section className="chat-text">Chats</section>
                </section>
                {itemElements}
            </section>
            <section className="icon-panel">
                <CreateUserSvg />
                <Settings />
                <Messages />
            </section>
        </section>
        </>
    )
}
export default ChatPanel