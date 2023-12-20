import { useEffect, useState } from 'react'

import { socket } from '../socket'
import { channelEvents } from '../utils/eventNames'
import Search from './Search'
import ChatTextContainer from './ChatTextContainer'
import Chat from './Chat'
import Menu from './Menu'


const Chats = () => {
    const [chats, setChats] = useState([])
    useEffect(() => {
        const getChatData = (chatsData) => {
            if (Array.isArray(chatsData)) {
                setChats(chatsData)
            }
        }
        socket.on(channelEvents.channelAndLastMessage, getChatData)
    }, [chats])

    return (
        <>
            <section className="bg-white">
                <Search />
                <ChatTextContainer />
                <section className="chats">
                    {chats.map(({ channelInfo, userInfo, messageInfo }, i) => (
                        <Chat
                            key={i}
                            channelInfo={channelInfo}
                            userInfo={userInfo}
                            messageInfo={messageInfo}
                        />
                    ))}
                </section>
                <Menu />
            </section>
        </>
    )
}
export default Chats