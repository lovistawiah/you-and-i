import { Link } from 'react-router-dom'
import { setChatInfo } from '../app/chatSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { format } from 'date-fns'
import { socket } from '../socket'
import { usrEvents } from '../utils/eventNames'
import { typing } from '../app/chatsSlice'
import { clearMessages } from '../app/messagesSlice'

const Chat = ({ chatId, userId, username, avatarUrl, lastMessage, lstMsgDate }) => {
    const dispatch = useDispatch()
    const isTypingObj = useSelector((state) => state.chats.typingObj)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const chatRef = useRef(null)

    let chatDate;
    if (format(lstMsgDate, 'h:mm a')) {
        chatDate = format(lstMsgDate, 'h:mm a')
    }

    const handleChat = ({ userId, chatId, avatarUrl, username }) => {
        const chatObj = {
            userId,
            chatId,
            avatarUrl,
            username,
        }
        dispatch(clearMessages())
        dispatch(setChatInfo(chatObj))
    }

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.innerWidth])

    useEffect(() => {
        let noDataTimeout;
        function startNoDataTimer() {
            noDataTimeout = setTimeout(() => {
                dispatch(typing(null))
            }, 1100)
        }
        socket.on(usrEvents.typing, (data) => {
            const { chatId } = data
            if (chatId) {
                clearTimeout(noDataTimeout)
                dispatch(typing(data))
            }
            startNoDataTimer()
        })
        return () => {
            socket.off(usrEvents.typing)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // when submitted turn typing should be null 

    return (

        // add messages page if page width less than 1000
        <Link to={`/${windowWidth < 1000 ? 'messages' : ''}`} className=" w-full justify-start items-center flex " ref={chatRef} id={chatId} key={chatId} onClick={() => handleChat({ userId, chatId, avatarUrl, username })}>
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
                <section className="text-neutral-400 text-sm font-normal line-clamp-2 text-ellipsis w-full flex-grow basis-0 pt-[4px] pr-0 pb-[40px] pl-1">
                    {
                        isTypingObj && isTypingObj.chatId === chatId ? <span>typing...</span> : <>{lastMessage}</>
                    }
                </section>
            </section>
        </Link>
    )
}

export default Chat