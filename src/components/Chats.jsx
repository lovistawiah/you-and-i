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
            <section className="order-2 h-screen md:w-[35vw] overflow-hidden md:border-r relative">
                <PageHeader pageName={"Chats"} />
                <Search />
                <div className="overflow-y-auto mt-[129px] absolute top-4 bottom-4 left-0 right-0 z-[99] w-full">
                    {chats.map(({ channelInfo, userInfo, messageInfo }, i) => (
                        <Chat
                            key={i}
                            channelInfo={channelInfo}
                            userInfo={userInfo}
                            messageInfo={messageInfo}
                        />
                    ))}
                </div>
            </section>

        </>
    )
}
export default MainPage