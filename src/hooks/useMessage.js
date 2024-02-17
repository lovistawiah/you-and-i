import { useEffect, useState } from "react"
import {useDispatch,useSelector} from "react-redux"
import { socket } from "../socket"
import { msgEvents } from "../utils/eventNames"
import { modifyMsg, replyMessage, updateSingleMsg } from "../app/messagesSlice"
import { updateLastMessage } from "../app/chatsSlice"

const useMessage = ({msgIdRef,msgRef,ulRef}) => {
    const [showOps, setShowOps] = useState(false)
    const dispatch = useDispatch()
    const chatId = useSelector((state) => state.chat.value.chatId)
    const storedMessages = useSelector((state) => state.messages.messages)

   useEffect(() => {

        socket.on(msgEvents.delMsg, (msgObj) => {
            dispatch(modifyMsg(msgObj))
            //to update the chat last message if deleted message is the last message in the messages
            const msgId = msgObj.Id
            const idx = storedMessages.findIndex((stMsg) => stMsg.Id === msgId)
            if (idx === storedMessages.length - 1) {
                dispatch(updateLastMessage({ chatId: msgObj.chatId, lastMessage: msgObj.message, msgDate: msgObj.updatedAt }))
            }

        })

        socket.on(msgEvents.updateMsg, (msgObj) => {

            dispatch(modifyMsg(msgObj))
            //to update the chat last message if updated message is the last message in the messages
            const msgId = msgObj.Id
            const idx = storedMessages.findIndex((stMsg) => stMsg.Id === msgId)

            if (idx === storedMessages.length - 1) {
                dispatch(updateLastMessage({ chatId: msgObj.chatId, lastMessage: msgObj.message, msgDate: msgObj.updatedAt }))
            }
        })

        return () => {
            socket.off(msgEvents.updateMsg)
            socket.off(msgEvents.delMsg)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    useEffect(() => {
        //clear Edit and Delete container on the page is selected
        const handleClickOutside = (event) => {
            if (ulRef.current && !ulRef.current.contains(event.target)) {
                setShowOps(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    })
    //to show Edit and Delete btn
     const handleMsgOps = () => {
        setShowOps(true)
    }
    /**
     * when clicked outside the window hide message ops
     */
    const onBlurOps = ()=>{
        setShowOps(false)
    }

    const deleteMsg = () => {
        if (!msgIdRef.current) return;
        const msgId = msgIdRef.current.id
        if (!msgId && !chatId) return
        setShowOps(false)
        // chatId is used to emit the chat back.
        socket.emit(msgEvents.delMsg, { msgId, chatId })
         setShowOps(false)
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
        setShowOps(false)
    }

    const replyMsg = ()=>{
        if (!msgIdRef.current && msgRef.current) return;
        const msgId = msgIdRef.current.id
        const message = msgRef.current.textContent

        const msgObj = {
            msgId,
            message
        }
        dispatch(replyMessage(msgObj))
        // console.log(msgObj)
        setShowOps(false)
    }
  
    return {deleteMsg,editMsg,showOps,handleMsgOps,onBlurOps,replyMsg}

}

export default useMessage

// Reply feature 
// ul should appear on sent and received messages only reply should appear on received messages but reply delete edit should appear on sent message.
// reply is a new message created with reply message

// reply message {
// sender Id 
// referenced message Id
//}

// message obj + reply obj {senderId, message}