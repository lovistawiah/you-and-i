import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useChatInfo from "../hooks/useChatInfo";
import useTyping from "../hooks/useTyping";

const ChatInfo = ({ windowWidth }: { windowWidth: number }) => {
  const { goBack, chatInfo } = useChatInfo();
  const { isTypingObj } = useTyping();

  return (
    <section className="col-start-1 col-end-2 row-start-1 flex h-[50px] w-full items-center justify-between border-b bg-white py-1 pl-2">
      {
        //show back arrow on mobile device
        windowWidth < 768 && (
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="m-2 cursor-pointer p-2 hover:rounded-full hover:bg-gray-100"
            onClick={goBack}
          />
        )
      }
      <section className="flex h-[50px] w-[50px] items-center justify-between">
        <img
          src={chatInfo?.avatarUrl}
          alt="user profile"
          className="h-fit w-fit rounded-full object-contain"
        />
      </section>
      <section className="flex h-[50px] w-full flex-col items-center justify-between pt-2">
        <section className="h-[25px] w-full px-[5px] pt-[1px] font-roboto text-base font-medium leading-tight text-zinc-800">
          {chatInfo?.username}
        </section>
        <section className="flex h-[20px] w-full items-center justify-start px-[5px]  pb-2.5 font-roboto  text-[13px] text-zinc-900 opacity-60">
          {isTypingObj && isTypingObj.chatId === chatInfo?.chatId ? (
            <span className="font-rale font-normal italic text-gray-600">
              typing...
            </span>
          ) : chatInfo?.status ? (
            chatInfo.status === "Online" ? (
              chatInfo.status
            ) : (
              <span className="pr-[3px] font-roboto">{`last seen ${chatInfo.status}`}</span>
            )
          ) : null}
        </section>
      </section>
    </section>
  );
};

export default ChatInfo;
