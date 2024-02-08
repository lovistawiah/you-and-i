import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { differenceInMinutes, format, parseISO } from "date-fns"
import { useRef } from "react"
import useMessage from "../hooks/useMessage"


const Message = ({ message, sender, msgDate, userId, msgId, info }) => {
    const ulRef = useRef(null)
    const msgRef = useRef(null)
    const msgIdRef = useRef(null)

    const { deleteMsg, editMsg, handleMsgOps, showOps, onBlurOps } = useMessage({ msgIdRef, msgRef, ulRef })


    let msgColor, align, margin;
    const msgStatus = format(msgDate, 'h:mm a');

    if (userId !== sender) {
        msgColor = 'bg-blue-500';
        align = 'self-end';
        margin = "mr-5 m-3";
    } else {
        msgColor = 'bg-gray-300';
        align = 'self-start';
        margin = 'ml-5 m-3';
    }

    const minDiff = differenceInMinutes(new Date(), parseISO(msgDate))


    return (
        <section ref={msgIdRef} className={`${align} ${msgColor} relative flex flex-col font-roboto text-base ${margin} rounded-lg p-1 font-thin`} id={msgId} key={msgId}>

            {
                showOps && <ul ref={ulRef} className={`${userId === sender ? 'hidden' : ''}  absolute bg-red-500 right-0 top-0 p-2 rounded`} onBlur={onBlurOps}>
                    <li className={`${minDiff > 5 ? 'hidden' : ''} hover:bg-green-300 z-40`}>
                        <button onClick={editMsg}>Edit</button>
                    </li>
                    <li className=" hover:bg-green-300 z-40 p-1 rounded">
                        <button onClick={deleteMsg}>Delete</button>
                    </li>
                </ul>
            }

            <div className="flex">
                <div ref={msgRef} className={` max-w-[250px] md:max-w-[400px] lg:max-w-[455px] break-all ${info == 'deleted' ? 'italic' : ''} ${sender !== userId ? 'text-gray-50' : ''}`}>
                    {message}
                </div>
                <span className=" px-1 self-start text-gray-400 text-center">
                    {
                        sender !== userId ?
                            info !== 'deleted' ?

                                <FontAwesomeIcon icon={faChevronDown} onClick={handleMsgOps} className="text-base cursor-pointer" /> : null : null
                    }
                </span>
            </div>
            <div className={`self-end text-[13px]`}>
                {
                    info !== 'created' ?
                        <span className="italic  font-normal">{info} {msgStatus}</span>
                        : <span>{msgStatus}</span>
                }
            </div>
        </section>
    );
};

export default Message;
