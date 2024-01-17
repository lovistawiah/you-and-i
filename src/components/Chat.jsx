import { Link } from 'react-router-dom'
import { chatInfo } from '../app/chatInfoSlice'
import { useDispatch } from 'react-redux'
import { messageStatus } from '../utils/compareDate'
const Chat = ({ channelInfo, userInfo, messageInfo }) => {
    const dispatch = useDispatch()
    const handleChat = ({ userId, channelId, avatarUrl, username }) => {
        const chatObj = {
            userId,
            channelId,
            avatarUrl,
            username
        }
        dispatch(chatInfo(chatObj))
    }
    return (
        <Link to='/messages' className="w-full justify-start items-center flex " id={channelInfo.channelId} key={channelInfo.channelId} onClick={() => handleChat({ userId: userInfo.userId, channelId: channelInfo.channelId, avatarUrl: userInfo.avatarUrl, username: userInfo.username })}>

            <section className="w-[70px] h-[65px] p-2.5 justify-center items-center flex shrink-0">
                <img src={userInfo.avatarUrl} alt="user dp" className='rounded-full' />
            </section>

            <section className="py-1 flex flex-col w-full gap-[0px] border-b border-neutral-400">

                <section className="flex items-end h-[32px] px-[4px] justify-between shrink-0">
                    <section className=" h-[24.50px] pt-1 text-zinc-950 text-base font-medium" id={userInfo.userId}>
                        {userInfo.username}
                    </section>
                    <div className="h-[24.50px] pb-[3px] pr-4 justify-end items-center pt-1 text-neutral-400 text-xs font-light">
                        {messageStatus(messageInfo.createdAt)}
                    </div>
                </section>

                {/* last message */}
                <section className="text-neutral-400 text-sm font-normal line-clamp-2 text-ellipsis w-full flex-grow basis-0 pt-[4px] pr-0 pb-[40px] pl-1">
                    {messageInfo.lastMessage}
                </section>
            </section>
        </Link>
    )
}

export default Chat