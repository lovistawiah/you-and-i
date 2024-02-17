import { useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux'
import { addMessage } from "../app/messagesSlice";
import { socket } from "../socket";
import { msgEvents } from "../utils/eventNames";
import { updateLastMessage } from "../app/chatsSlice";
import { updateNewChat } from "../app/chatSlice";

const useMessages = ({chatId,messagesRef,userId}) => {
    const dispatch = useDispatch()
    const messages = useSelector((state) => state.messages.messages)
    
  useEffect(() => {
        const getMessages = (messagesData) => {
            dispatch(addMessage(messagesData))
        };
        socket.emit(msgEvents.msgs, chatId);
        socket.on(msgEvents.msgs, getMessages);

        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });

        return () => {
            socket.off(msgEvents.msgs, getMessages);
            socket.off('error')
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatId])


    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages])

 useEffect(() => {
        const handleSendMessage = (msg) => {
            dispatch(updateLastMessage({ chatId: msg.chatId, lastMessage: msg.message, msgDate: msg.createdAt }))
            dispatch(addMessage(msg))
            dispatch(updateNewChat({ chatId: msg.chatId, userId }))
        }
        socket.on(msgEvents.sndMsg, handleSendMessage)
        return () => {
            socket.off(msgEvents.sndMsg, handleSendMessage)
        }
    })

    useEffect(()=>{
        socket.on(msgEvents.reply,(data)=>{
            console.log(data)
        })
    })
}

export default useMessages