import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { socket } from '../socket'
import { chatEvents } from '../utils/eventNames'
import Search from './Search'
import PageHeader from './PageHeader'
import Chat from './Chat'
import { addChats } from '../app/chatsSlice'

const MainPage = () => {
    const chats = useSelector((state) => state.chats.chats)
    const dispatch = useDispatch()

    useEffect(() => {
        const getChatData = (chatsData) => {
            if (typeof chatsData !== 'string') {
                dispatch(addChats(chatsData))
            }
        }
        socket.emit(chatEvents.chatLastMsg, {})
        socket.on(chatEvents.chatLastMsg, getChatData)
        return () => {
            socket.off(chatEvents.chatLastMsg)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <section className="order-2 w-full md:border-r md:w-[40%] relative">
            <PageHeader pageName={"Chats"} />
            <Search eventName={chatEvents.searchChats} />
            <div className="overflow-y-auto mt-[129px] absolute top-2 bottom-[56px] left-0 right-0 w-full md:bottom-1">
                {
                    Array.isArray(chats) && chats.length > 0 ?
                        chats.map((chat) => (
                            <Chat
                                key={chat.Id}
                                chatId={chat.Id}
                                avatarUrl={chat.avatarUrl}
                                lstMsgDate={chat.lstMsgDate}
                                lastMessage={chat.lastMessage}
                                userId={chat.userId}
                                username={chat.username}
                            />
                        )) :
                        <section className='text-center font-rale font-bold text-lg'>
                            No chats found
                        </section>
                }
            </div>
        </section>
    )
}
export default MainPage