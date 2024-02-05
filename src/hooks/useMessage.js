import { useEffect, useState } from "react"
import {useDispatch,useSelector} from "react-redux"
import { socket } from "../socket"
import { msgEvents } from "../utils/eventNames"
import { modifyMsg, updateSingleMsg } from "../app/messagesSlice"
import { updateLastMessage } from "../app/chatsSlice"

const useMessage = ({msgIdRef,msgRef,ulRef}) => {
     const chatId = useSelector((state) => state.chat.value.chatId)
const dispatch = useDispatch()
 const storedMessages = useSelector((state) => state.messages.messages)
  const [showOps, setShowOps] = useState(false);
   useEffect(() => {
        socket.on(msgEvents.delMsg, (msgObj) => {
            dispatch(modifyMsg(msgObj))
            //to update the chat last message if deleted message is the last message in the messages
            const msgId = msgObj.Id
            const idx = storedMessages.findIndex((stMsg) => stMsg.Id === msgId)
            if (idx === storedMessages.length - 1) {
                dispatch(updateLastMessage({ chatId: msgObj.chatId, lastMessage: msgObj.message, msgDate: msgObj.msgDate }))
            }

        })
        socket.on(msgEvents.updateMsg, (msgObj) => {
            dispatch(modifyMsg(msgObj))
            //to update the chat last message if updated message is the last message in the messages
            const msgId = msgObj.Id
            const idx = storedMessages.findIndex((stMsg) => stMsg.Id === msgId)

            if (idx === storedMessages.length - 1) {
                dispatch(updateLastMessage({ chatId: msgObj.chatId, lastMessage: msgObj.message, msgDate: msgObj.msgDate }))
            }

        })
        return () => {
            socket.off(msgEvents.updateMsg)
            socket.off(msgEvents.delMsg)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
        useEffect(() => {
        const handleClickOutside = (event) => {
            if (ulRef.current && !ulRef.current.contains(event.target)) {
                setShowOps(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showOps]);

    const deleteMsg = () => {
        if (!msgIdRef.current) return;
        const msgId = msgIdRef.current.id
        if (!msgId && !chatId) return
        socket.emit(msgEvents.delMsg, { msgId, chatId })
    }

    const editMsg = () => {
        if (!msgIdRef.current && msgRef.current) return;
        const msgId = msgIdRef.current.id
        const message = msgRef.current.textContent
        const msgObj = {
            msgId,
            message
        }
        // turns updateMsg to true
        dispatch(updateSingleMsg(msgObj))
    }
     function handleMsgOps() {
        setShowOps(!showOps);
    }
    return {deleteMsg,editMsg,handleMsgOps,showOps}

}

export default useMessage