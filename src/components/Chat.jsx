import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { format } from 'date-fns'
import useChat from '../hooks/useChat'

const Chat = ({ chatId, userId, username, avatarUrl, lastMessage, lstMsgDate }) => {
    const { isTypingObj, windowWidth, handleChat } = useChat()
    const chatRef = useRef(null)

    let chatDate;
    if (format(lstMsgDate, 'h:mm a')) {
        chatDate = format(lstMsgDate, 'h:mm a')
    }
    return (

        // add messages page if page width less than 1000
        <Link to={`/${windowWidth < 768 ? 'messages' : ''}`} className=" w-full justify-start items-center flex h-[70px]" ref={chatRef} id={chatId} key={chatId} onClick={() => handleChat({ userId, chatId, avatarUrl, username })}>
            <section className="w-[70px] h-[65px] p-2.5 justify-center items-center flex shrink-0">
                <img src={avatarUrl} alt="user dp" className='rounded-full' />
            </section>

            <section className="py-1 flex flex-col w-full gap-[0px] border-b border-neutral-400">
                <section className="flex items-end h-[32px] px-[4px] justify-between shrink-0">
                    <section className=" h-[24.50px] pt-1 text-zinc-950 text-base font-medium" id={userId}>
                        {username}
                    </section>
                    <div className="h-[24.50px] pb-[3px] pr-4 justify-end items-center pt-1 text-neutral-400 text-xs font-light">
                        {chatDate}
                    </div>
                </section>

                {/* last message */}
                <section className="text-neutral-400 text-sm font-normal line-clamp-1 text-ellipsis w-full flex-grow basis-0 pt-[4px] pr-0 pb-[20px] pl-1 break-all">
                    {
                        isTypingObj && isTypingObj.chatId === chatId ? <span className='tiea'>typing...</span> : <>{lastMessage}</>
                    }
                </section>
            </section>
        </Link>
    )
}

export default Chat