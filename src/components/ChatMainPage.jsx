import { useEffect, useState } from 'react'
import { socket } from '../socket'
import { channelEvents } from '../utils/eventNames'
import Search from './Search'
import ChatTextContainer from './ChatTextContainer'
import Chat from './Chat'
import Menu from './Menu'
import WelcomePage from './WelcomePage'


const Chats = () => {
    const [chats, setChats] = useState([])
    const [isToken, setIsToken] = useState(true)
    useEffect(() => {
        const getChatData = (chatsData) => {
            if (Array.isArray(chatsData)) {
                setChats(chatsData)
            }
        }
        socket.on(channelEvents.channelAndLastMessage, getChatData)
        return () => {
            socket.off(channelEvents.channelAndLastMessage)
        }
    }, [chats])

    useEffect(() => {
        socket.on('connect_error', (data) => {
            console.log(data)
            if (data) {
                setIsToken(false)
            }
        })
    }, [isToken])
    return (
        !isToken ? (
            <WelcomePage />
        ) : (
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
    )
}
export default Chats