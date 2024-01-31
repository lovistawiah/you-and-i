import { useEffect, useMemo, useState } from 'react'
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
    const cachedChats = useMemo(() => {
        return chats
    }, [chats])
    return (
        <>
            <section className="order-2 w-full md:border-r md:w-[40%] relative">
                <PageHeader pageName={"Chats"} />
                <Search eventName={channelEvents.searchChats} />
                <div className="overflow-y-auto mt-[129px] absolute top-2 bottom-[56px] left-0 right-0 w-full md:bottom-1">
                    {
                        Array.isArray(cachedChats) && cachedChats.length > 0 ?
                            chats.map((cachedChats) => (
                                <Chat
                                    key={cachedChats.channelId}
                                    avatarUrl={cachedChats.avatarUrl}
                                    channelId={cachedChats.channelId}
                                    createdAt={cachedChats.createdAt}
                                    lastMessage={cachedChats.lastMessage}
                                    userId={cachedChats.userId}
                                    username={cachedChats.username}
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