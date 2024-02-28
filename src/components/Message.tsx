import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { differenceInMinutes, format, parseISO } from "date-fns";
import { useRef } from "react";
import useMessage from "../hooks/useMessage";

const Message = ({ message, sender, msgDate, userId, msgId, info, reply }) => {
  const ulRef = useRef(null);
  const msgRef = useRef(null);
  const msgIdRef = useRef(null);

  const { deleteMsg, editMsg, handleMsgOps, showOps, onBlurOps, replyMsg } =
    useMessage({ msgIdRef, msgRef, ulRef });
  const chatUsername = useSelector((state) => state.chat?.value?.username);

  let msgColor, align, margin, replyColor, replyUserColor;
  const msgStatus = format(msgDate, "h:mm a");

  if (userId !== sender) {
    msgColor = "bg-blue-500";
    align = "self-end";
    margin = "mr-5 m-3";
    replyColor = "bg-blue-600";
    replyUserColor = "text-blue-100";
  } else {
    msgColor = "bg-gray-200";
    align = "self-start";
    margin = "ml-5 m-3";
    replyColor = "bg-gray-300 border-l-blue-700";
    replyUserColor = "text-blue-600";
  }

  const minDiff = differenceInMinutes(new Date(), parseISO(msgDate));

  return (
    <section
      ref={msgIdRef}
      className={`${align} ${msgColor} relative flex flex-col font-roboto text-base ${margin} rounded-lg p-1 font-thin`}
      id={msgId}
      key={msgId}
    >
      {showOps && (
        <ul
          ref={ulRef}
          className={`absolute right-[0px] top-[-30px] h-fit w-[70px] rounded-[2px] bg-blue-900 text-center font-roboto text-white`}
          onBlur={onBlurOps}
        >
          <li className={`z-40 w-full p-2 hover:bg-blue-950`}>
            <button onClick={replyMsg}>Reply</button>
          </li>
          {/* sender message ops */}
          <div className={`${userId === sender ? "hidden" : ""}`}>
            <li
              className={`${minDiff > 5 ? "hidden" : ""} z-40 w-full p-2 hover:bg-blue-950`}
            >
              <button onClick={editMsg}>Edit</button>
            </li>

            <li className=" z-40 w-full p-2 hover:bg-blue-950">
              <button onClick={deleteMsg}>Delete</button>
            </li>
          </div>
        </ul>
      )}

      <div className="flex">
        <div
          ref={msgRef}
          className={` max-w-[250px] break-all md:max-w-[400px] lg:max-w-[455px] ${info === "deleted" ? "font-rale italic" : ""} ${sender !== userId ? "text-white" : ""}`}
        >
          {reply && (
            <div
              className={`${replyColor} rounded border-l-[3px] p-1`}
              id={reply.Id}
            >
              <div className={`${replyUserColor} mb-[3px] text-[15px]`}>
                {reply.sender !== userId ? "You" : chatUsername}
              </div>
              <div className="font-roboto text-[13px]">{reply.message}</div>
            </div>
          )}

          {message}
        </div>
        <span className=" self-start px-1 text-center">
          {info !== "deleted" ? (
            <FontAwesomeIcon
              icon={faChevronDown}
              onClick={handleMsgOps}
              className="cursor-pointer  text-base"
            />
          ) : null}
        </span>
      </div>
      <div
        className={`self-end text-[12px] ${userId !== sender ? "text-gray-200" : "text-gray-500"}`}
      >
        {info !== "created" ? (
          <span className="font-rale  font-light italic">
            {info} {msgStatus}
          </span>
        ) : (
          <span>{msgStatus}</span>
        )}
      </div>
    </section>
  );
};

export default Message;
