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
            setChats(chatsData)
        }
        socket.emit(channelEvents.channelAndLastMessage, {})
        socket.on(channelEvents.channelAndLastMessage, getChatData)

        return () => {
            socket.off(channelEvents.channelAndLastMessage)
        }
    }, [])
    return (
        <>
            <section className="order-2 w-full md:border-r md:w-[40%] relative">
                <PageHeader pageName={"Chats"} />
                <Search eventName={channelEvents.searchChats} />
                <div className="overflow-y-auto mt-[129px] absolute top-2 bottom-[56px] left-0 right-0 w-full md:bottom-1">
                    {
                        Array.isArray(chats) && chats.length > 0 ?
                            chats.map(({ channelInfo, userInfo, messageInfo }, i) => (
                                <Chat
                                    key={i}
                                    channelInfo={channelInfo}
                                    userInfo={userInfo}
                                    messageInfo={messageInfo}
                                />
                            )) :
                            <section className='text-center font-rale font-bold text-lg'>{chats}</section>
                    }
                </div>
            </section>

        </>
    )
}
export default MainPage