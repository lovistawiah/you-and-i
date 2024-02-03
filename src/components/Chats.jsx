
import { chatEvents } from '../utils/eventNames'
import Search from './Search'
import PageHeader from './PageHeader'
import Chat from './Chat'
import useChats from '../hooks/useChats'


const MainPage = () => {
    const chats = useChats()
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