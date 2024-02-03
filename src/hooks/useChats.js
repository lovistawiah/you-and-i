import {useSelector,useDispatch} from 'react-redux'
import { useEffect } from 'react'
import { socket } from '../socket'
import { chatEvents } from '../utils/eventNames'
import { addChats } from '../app/chatsSlice'

const useChats =()=>{
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
    return chats
}
export default useChats