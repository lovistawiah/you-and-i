import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux' 
import { clearMessages } from '../app/messagesSlice'
import { setChatInfo } from '../app/chatSlice'

const useChat = () => {
        const [windowWidth, setWindowWidth] = useState(window.innerWidth)
        const dispatch = useDispatch()

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
 return {windowWidth,handleChat}
}

export default useChat