import { faEllipsisVertical, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { differenceInMinutes, format, parseISO } from "date-fns"
import { useRef } from "react"


import useMessage from "../hooks/useMessage"


const Message = ({ message, sender, msgDate, userId, msgId, info }) => {
    const ulRef = useRef(null)
    const msgRef = useRef(null)
    const msgIdRef = useRef(null)

    const { deleteMsg, editMsg, handleMsgOps, showOps } = useMessage({ msgIdRef, msgRef, ulRef })

    let msgColor, align, opsAlign, ellipsisOrder, margin, opsPosition;
    const msgStatus = format(msgDate, 'h:mm a');

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

    const minDiff = differenceInMinutes(new Date(), parseISO(msgDate))
    return (

        <section ref={msgIdRef} className={`${align} relative`} id={msgId} key={msgId}>
            {showOps && userId !== sender && (
                <ul ref={ulRef} className={`absolute ${opsPosition} ${opsAlign} bg-white p-2 w-fit rounded text-gray-500 z-20`} onBlur={handleMsgOps}>

                    <li className={`p-1 flex justify-between w-[100px] hover:bg-gray-100 rounded items-center cursor-pointer ${minDiff > 5 ? 'hidden' : ''} `}>
                        <button onClick={editMsg} className="p-1 flex justify-between w-full items-center outline-none">
                            <p>Edit</p> <FontAwesomeIcon icon={faPencil} />
                        </button>
                    </li>
                    <li className=' w-[100px] text-red-400  hover:bg-gray-100 rounded cursor-pointer'>
                        <button onClick={deleteMsg} className="p-1 flex justify-between w-full items-center outline-none">
                            <p>Delete</p> <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </li>
                </ul>
            )}

            <section className={`flex items-start gap-[5px]  ${margin}`}>
                {
                    message === "this message was deleted" || userId !== sender && <FontAwesomeIcon
                        icon={faEllipsisVertical}
                        onClick={handleMsgOps}
                        className={`${ellipsisOrder} text-gray-500 text-sm cursor-pointer`}
                    />
                }

                <section className={`w-fit flex flex-col`}>
                    <section ref={msgRef} className={`${msgColor}`}>{message}</section>
                    {
                        info == 'created' ? <p>{msgStatus}</p> : <p>
                            {/* make italics */}
                            <span>{info}</span>
                            {msgStatus}
                        </p>
                    }
                </section>
            </section>
        </section>
    );
};

export default Message;
