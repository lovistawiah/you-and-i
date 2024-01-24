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
            <section className="order-2 w-full md:border-r md:w-[40%] relative">
                <PageHeader pageName={"Chats"} />
                <Search />
                <div className="overflow-y-auto mt-[129px] absolute top-2 bottom-[56px] left-0 right-0 w-full md:bottom-1">
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