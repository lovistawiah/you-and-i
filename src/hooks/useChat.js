import { useEffect, useState } from 'react'
import {useSelector,useDispatch } from 'react-redux' 
import { clearMessages } from '../app/messagesSlice'
import { setChatInfo } from '../app/chatSlice'
import { typing } from '../app/chatsSlice'
import { usrEvents } from '../utils/eventNames'
import { socket } from '../socket'
const useChat = () => {
        const [windowWidth, setWindowWidth] = useState(window.innerWidth)
        const dispatch = useDispatch()

 const isTypingObj = useSelector((state) => state.chats.typingObj)
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

  useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.innerWidth])
 return {isTypingObj,windowWidth,handleChat}
}

export default useChat