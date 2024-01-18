import { useEffect, useState } from 'react'
import { socket } from '../socket'
import { channelEvents } from '../utils/eventNames'
import Search from './Search'
import PageHeader from './PageHeader'
import Chat from './Chat'

const MainPage = () => {
    const [chats, setChats] = useState([])
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


    return (
        <>
            <section className="bg-white">
                <Search />
                <PageHeader pageName={"Chats"} />
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
            </section>
        </>
    )
}
export default MainPage