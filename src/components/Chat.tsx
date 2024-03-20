import { Link } from "react-router-dom";
import { useRef } from "react";
import { format } from "date-fns";
import useChat from "../hooks/useChat";
import useTyping from "../hooks/useTyping";
import { ChatsValue } from "../db/chats";

const Chat = ({ id, userId, username, avatarUrl, lastMessage, lstMsgDate }: ChatsValue) => {
  const { windowWidth, handleChat } = useChat();
  const { isTypingObj } = useTyping();
  const chatRef = useRef(null);

  let chatDate;
  if (format(lstMsgDate, "h:mm a")) {
    chatDate = format(lstMsgDate, "h:mm a");
  }
  return (
    <Link
      to={`/${windowWidth < 768 ? "messages" : ""}`}
      className=" flex h-[70px] w-full items-center justify-start"
      ref={chatRef}
      id={id}
      key={id}
      onClick={() => handleChat({ userId, id, avatarUrl, username })}
    >
      <section className="flex h-[65px] w-[70px] shrink-0 items-center justify-center p-2.5">
        <img src={avatarUrl} alt="user dp" className="rounded-full" />
      </section>

      <section className="flex w-full flex-col gap-[0px] border-b border-neutral-400 py-1">
        <section className="flex h-[32px] shrink-0 items-end justify-between px-[4px]">
          <section className=" h-[24.50px] pt-1 text-base font-medium text-zinc-950" id={userId}>
            {username}
          </section>
          <div className="h-[24.50px] items-center justify-end pb-[3px] pr-4 pt-1 text-xs font-light text-neutral-400">
            {chatDate}
          </div>
        </section>

        {/* last message */}
        <section className="line-clamp-1 w-full flex-grow basis-0 text-ellipsis break-all pb-[20px] pl-1 pr-0 pt-[4px] text-sm font-normal text-neutral-400">
          {isTypingObj && isTypingObj.chatId === id ? (
            <span className="italic">typing...</span>
          ) : (
            <>{lastMessage}</>
          )}
        </section>
      </section>
    </Link>
  );
};

export default Chat;
