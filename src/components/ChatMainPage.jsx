import { socket } from '../socket'
import { channelEvents } from '../utils/eventNames'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faComments, faGear, } from '@fortawesome/free-solid-svg-icons'

import Dp from '../images/user-dp.png'
import { useEffect, useState } from 'react'
import { chatInfo } from '../app/chatInfoSlice'
import Search from './Search'
import ChatTextContainer from './ChatTextContainer'


const Chats = () => {

    const [chats, setChats] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        const getChatData = (chatsData) => {
            if (Array.isArray(chatsData)) {
                setChats(chatsData)
            }
        }
        socket.on(channelEvents.channelAndLastMessage, getChatData)
    }, [chats])

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
        <>
            <section className="bg-white">
                <Search />
                <ChatTextContainer />

                <section className="chats">
                    {chats.map(({ channelInfo, userInfo, messageInfo }) => (
                        <Link to='/messages' className="chat" id={channelInfo.channelId} key={channelInfo.channelId} onClick={() => handleChat({ userId: userInfo.userId, channelId: channelInfo.channelId, avatarUrl: userInfo.avatarUrl, username: userInfo.username })}>
                            <section className="picture-frame">
                                <img src={Dp} alt="user dp" />
                            </section>
                            <section className="user-info">
                                <section className="username-and-time">
                                    <p className="username" id={userInfo.userId}>{userInfo.username}</p>
                                    <p className="last-message-time">{messageInfo.createdAt}
                                    </p>
                                </section>

                                <p className="last-message">
                                    {messageInfo.lastMessage}
                                </p>
                            </section>
                        </Link>
                    ))}
                </section>
                <div className="menu">
                    <FontAwesomeIcon icon={faGear} />
                    <FontAwesomeIcon icon={faComments} />
                </div>
            </section>
        </>
    )
}
export default Chats