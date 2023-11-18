import { socket } from '../socket'
import { channelEvents } from '../utils/eventNames'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faComments, faGear, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import '../styles/style.css'

import Dp from '../images/user-dp.png'
import { useEffect, useState } from 'react'
import { chatInfo } from '../app/chatInfoSlice'


const Chats = () => {

    const [chats, setChats] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        const getChatData = (chatsData) => {
            setChats(chatsData)
        }
        socket.on(channelEvents.channelAndLastMessage, getChatData)
        return () => {
            socket.off(channelEvents.channelAndLastMessage)
        }
    }, [chats])
    
    useEffect(() => {
        return () => {
            socket.disconnect();
        }
    }, [])

    const handleChat = ({ userId, channelId }) => {
        const chatObj = {
            userId,
            channelId
        }
        dispatch(chatInfo(chatObj))
    }
    return (
        <>
            <section className="chats-panel">
                <div className="search-container">
                    <section className="search-holder">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input type="text" name="" placeholder='Search' id="" />
                    </section>
                </div>

                <section className="chats-text-container">
                    <section className="chats-text">Chats</section>
                    <FontAwesomeIcon icon={faChevronDown} />
                </section>

                <section className="chats">
                    {chats?.map(({ channelInfo, userInfo, messageInfo }) => (
                        <Link to='/messages' className="chat" id={channelInfo.channelId} key={channelInfo.channelId} onClick={() => handleChat({ userId: userInfo.userId, channelId: channelInfo.channelId })}>
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