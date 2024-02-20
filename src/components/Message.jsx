import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelector } from 'react-redux'
import { differenceInMinutes, format, parseISO } from "date-fns"
import { useRef } from "react"
import useMessage from "../hooks/useMessage"


const Message = ({ message, sender, msgDate, userId, msgId, info, reply }) => {
    const ulRef = useRef(null)
    const msgRef = useRef(null)
    const msgIdRef = useRef(null)

    const { deleteMsg, editMsg, handleMsgOps, showOps, onBlurOps, replyMsg } = useMessage({ msgIdRef, msgRef, ulRef })
    const chatUsername = useSelector((state) => state.chat?.value?.username)

    let msgColor, align, margin, replyColor, replyUserColor;
    const msgStatus = format(msgDate, 'h:mm a');

    if (userId !== sender) {
        msgColor = 'bg-blue-500';
        align = 'self-end';
        margin = "mr-5 m-3";
        replyColor = "bg-blue-600"
        replyUserColor = 'text-blue-100'
    } else {
        msgColor = 'bg-gray-200';
        align = 'self-start';
        margin = 'ml-5 m-3';
        replyColor = 'bg-gray-300 border-l-blue-700'
        replyUserColor = "text-blue-600"
    }

    const minDiff = differenceInMinutes(new Date(), parseISO(msgDate))

    return (
        <section ref={msgIdRef} className={`${align} ${msgColor} relative flex flex-col font-roboto text-base ${margin} rounded-lg p-1 font-thin`} id={msgId} key={msgId}>

            {
                showOps && <ul
                    ref={ulRef} className={`absolute bg-blue-900 right-[0px] top-[-30px] w-[70px] h-fit text-white rounded-[2px] text-center font-roboto`} onBlur={onBlurOps}>
                    <li className={`hover:bg-blue-950 z-40 p-2 w-full`}>
                        <button onClick={replyMsg}>Reply</button>
                    </li>
                    {/* sender message ops */}
                    <div className={`${userId === sender ? 'hidden' : ''}`}>
                        <li className={`${minDiff > 5 ? 'hidden' : ''} hover:bg-blue-950 z-40 p-2 w-full`}>
                            <button onClick={editMsg}>Edit</button>
                        </li>

                        <li className=" hover:bg-blue-950 z-40 p-2 w-full">
                            <button onClick={deleteMsg}>Delete</button>
                        </li>
                    </div>

                </ul>
            }

            <div className="flex">
                <div ref={msgRef} className={` max-w-[250px] md:max-w-[400px] lg:max-w-[455px] break-all ${info === 'deleted' ? 'italic font-rale' : ''} ${sender !== userId ? 'text-white' : ''}`}>

                    {reply && <div className={`${replyColor} rounded p-1 border-l-[3px]`} id={reply.Id}>
                        <div className={`${replyUserColor} mb-[3px] text-[15px]`}>{reply.sender !== userId ? "You" : chatUsername}</div>
                        <div className="text-[13px] font-roboto">{reply.message}</div>
                    </div>
                    }

                    {message}
                </div>
                <span className=" px-1 self-start text-center">
                    {
                        info !== 'deleted' ?
                            <FontAwesomeIcon icon={faChevronDown} onClick={handleMsgOps} className="text-base  cursor-pointer" /> : null
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
