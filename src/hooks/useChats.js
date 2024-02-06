import {useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'
import { socket } from '../socket'
import { chatEvents, msgEvents } from '../utils/eventNames'
import { addChats, addNewChat, searchChats } from '../app/chatsSlice'
import { addMessage } from '../app/messagesSlice'

const useChats =()=>{
   const [searchInput,setSearchInput]  = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        const getChatData = (chatsData) => {
            if (typeof chatsData !== 'string') {
                dispatch(addChats(chatsData))
            }
        }
        //old chats
        socket.emit(chatEvents.chatLastMsg, {})
        socket.on(chatEvents.chatLastMsg, getChatData)

        // new chats
        socket.on(msgEvents.newChat,(data)=>{
           const {msgObj,newChat} = data
           const chatPayload = {
            Id: newChat.Id,
            userId: newChat.userId,
            username: newChat.username,
            avatarUrl: newChat.avatarUrl,
            lastMessage:msgObj.message,
            lstMsgDate: msgObj.msgDate
           }
           dispatch(addNewChat(chatPayload))
           dispatch(addMessage(msgObj))
        })

        return () => {
            socket.off(chatEvents.chatLastMsg)
            socket.off(msgEvents.newChat)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(()=>{
        dispatch(searchChats(searchInput))
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchInput])
    return {searchInput,setSearchInput}
}
export default useChats