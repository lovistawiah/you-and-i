import { faEllipsisVertical, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { differenceInMinutes, format, parseISO } from "date-fns"
import { useEffect, useRef, useState } from "react"
import { socket } from '../socket'
import { messageEvents } from "../utils/eventNames"
import { useSelector } from 'react-redux'

const Message = ({ message, sender, createdAt, userId, msgId }) => {
    let msgColor, align, opsAlign, ellipsisOrder, margin, opsPosition;
    const chatId = useSelector((state) => state.chat.value.channelId)
    const ulRef = useRef(null)
    const msgRef = useRef(null)
    const msgIdRef = useRef(null)
    const [showOps, setShowOps] = useState(false);
    const msgStatus = format(createdAt, 'h:mm a');

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
    }, [showOps]);

    const deleteMsg = () => {
        if (!msgIdRef.current) return;
        const msgId = msgIdRef.current.id
        if (!msgId && !chatId) return
        socket.emit(messageEvents.deleteMessage, { msgId, chatId })


    }
    function handleMsgOps() {
        setShowOps(!showOps);
    }

    if (userId !== sender) {
        msgColor = 'bg-blue-400';
        align = 'self-end';
        margin = "mr-10";
        opsPosition = 'right-0'
    } else {
        msgColor = 'bg-gray-300';
        align = 'self-start';
        opsAlign = "order-3";
        ellipsisOrder = "order-2";
        margin = 'ml-10';
        opsPosition = 'left-0'
    }
    const minDiff = differenceInMinutes(new Date(), parseISO(createdAt))
    return (
        <section ref={msgIdRef} className={`${align} relative`} id={msgId} key={msgId}>
            {showOps && (
                <ul ref={ulRef} className={`absolute ${opsPosition} ${opsAlign} bg-white p-2 w-fit rounded text-gray-500 z-20`} onBlur={handleMsgOps}>
                    <li className={`p-1 flex justify-between w-[100px] hover:bg-gray-100 rounded items-center cursor-pointer ${minDiff > 5 ? 'hidden' : ''} `}>
                        <p>Edit</p> <FontAwesomeIcon icon={faPencil} />
                    </li>
                    <li className=' w-[100px] text-red-400  hover:bg-gray-100 rounded cursor-pointer'>
                        <button onClick={deleteMsg} className="p-1 flex justify-between w-full items-center outline-none">
                            <p>Delete</p> <FontAwesomeIcon icon={faTrash} />

                        </button>
                    </li>
                </ul>
            )}

            <section className={`flex items-start gap-[5px]  ${margin}`}>
                <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    onClick={handleMsgOps}
                    className={`${ellipsisOrder} text-gray-500 text-sm cursor-pointer`}
                />

                <section className={`w-fit flex flex-col`}>
                    <section ref={msgRef} className={`${msgColor}`}>{message}</section>
                    <p className={``}>{msgStatus}</p>
                </section>
            </section>
        </section>
    );
};

export default Message;
