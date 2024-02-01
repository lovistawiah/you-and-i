import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { socket } from '../socket'
import { chatEvents } from '../utils/eventNames'
import Search from './Search'
import PageHeader from './PageHeader'
import Chat from './Chat'
import { addChats } from '../app/chatsSlice'

const MainPage = () => {
    const storedChats = useSelector((state) => state.chats.chats)
    const [chats, setChats] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        const getChatData = (chatsData) => {
            console.log(chatsData)
            // setChats(chatsData)
            // dispatch(addChats(chatsData))
        }
        socket.emit(chatEvents.chatLastMsg, {})
        socket.on(chatEvents.chatLastMsg, getChatData)
        return () => {
            socket.off(chatEvents.chatLastMsg)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setChats(storedChats)
    }, [storedChats])

    const cachedChats = useMemo(() => {
        return chats
    }, [chats])
    return (
        <>
            <section className="order-2 w-full md:border-r md:w-[40%] relative">
                <PageHeader pageName={"Chats"} />
                <Search eventName={chatEvents.searchChats} />
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