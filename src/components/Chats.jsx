import { useEffect, useState } from 'react'
import { socket } from '../socket'
import { channelEvents } from '../utils/eventNames'
import Search from './Search'
import PageHeader from './PageHeader'
import Chat from './Chat'
import { CHATS } from '../utils/fakerWork'

const MainPage = () => {
    const [chats, setChats] = useState(CHATS)
    // useEffect(() => {
    //     const getChatData = (chatsData) => {
    //         if (Array.isArray(chatsData)) {
    //             setChats(chatsData)
    //         }
    //     }
    //     socket.on(channelEvents.channelAndLastMessage, getChatData)
    //     return () => {
    //         socket.off(channelEvents.channelAndLastMessage)
    //     }
    // }, [chats])
    return (
        <>
            <section className="order-2 h-screen w-[30vw]">
                <PageHeader pageName={"Chats"} />
                <Search />
                <section className="md:h-[79vh] overflow-y-auto mt-[129px] h-[91vh]">
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