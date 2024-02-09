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
        msgColor = 'bg-blue-600/100';
        align = 'self-end';
        margin = "mr-5 m-3";
    } else {
        msgColor = 'bg-gray-200';
        align = 'self-start';
        margin = 'ml-5 m-3';
    }

    const minDiff = differenceInMinutes(new Date(), parseISO(msgDate))

    return (
        <section ref={msgIdRef} className={`${align} ${msgColor} relative flex flex-col font-roboto text-base ${margin} rounded-lg p-1 font-thin`} id={msgId} key={msgId}>

            {
                showOps && <ul
                    ref={ulRef} className={`${userId === sender ? 'hidden' : ''}  absolute bg-gray-400 right-[10px] top-[-40px] p-2 text-white rounded`} onBlur={onBlurOps}>
                    <li className={`${minDiff > 5 ? 'hidden' : ''} hover:bg-gray-500 z-40`}>
                        <button onClick={editMsg}>Edit</button>
                    </li>

                    <li className=" hover:bg-gray-500 z-40 p-1 rounded">
                        <button onClick={deleteMsg}>Delete</button>
                    </li>
                </ul>
            }


            <div className="flex">
                <div ref={msgRef} className={` max-w-[250px] md:max-w-[400px] lg:max-w-[455px] break-all ${info === 'deleted' ? 'italic font-rale' : ''} ${sender !== userId ? 'text-white' : ''}`}>
                    {message}
                </div>
                <span className=" px-1 self-start text-gray-400 text-center">
                    {
                        sender !== userId ?
                            info !== 'deleted' ?

                                <FontAwesomeIcon icon={faChevronDown} onClick={handleMsgOps} className="text-base text-gray-200 cursor-pointer" /> : null : null
                    }
                </span>
            </div>
            <div className={`self-end text-[12px] ${userId !== sender ? 'text-gray-200' : 'text-gray-500'}`}>
                {
                    info !== 'created' ?
                        <span className="italic  font-light font-rale">{info} {msgStatus}</span>
                        : <span>{msgStatus}</span>
                }
            </div>
        </section>
    );
};

export default Message;
