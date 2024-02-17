import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelector } from "react-redux"
import useChatInfo from "../hooks/useChatInfo"
import useTyping from "../hooks/useTyping"

const ChatInfo = ({ windowWidth }) => {
    const chatInfo = useSelector((state) => state.chat.value);
    const { isTypingObj } = useTyping()
    const { goBack } = useChatInfo({ userId: chatInfo?.userId })

    return (
        <section className=" flex justify-between items-center w-full row-start-1 col-start-1 col-end-2 h-[50px] bg-white pl-2 border-b py-1">
            {   //show back arrow on mobile device
                windowWidth < 768 && <FontAwesomeIcon icon={faChevronLeft} className="cursor-pointer hover:bg-gray-100 hover:rounded-full p-2 m-2" onClick={goBack} />
            }
            <section className="w-[50px] h-[50px] justify-between items-center flex">
                <img src={chatInfo?.avatarUrl} alt="user profile" className="object-contain w-fit h-fit rounded-full" />
            </section>
            <section className="w-full h-[50px] flex-col justify-between items-center flex pt-2">
                <section className="w-full h-[25px] px-[5px] text-zinc-800 text-base pt-[1px] font-medium leading-tight font-roboto">{chatInfo?.username}
                </section>
                <section className="w-full h-[20px] px-[5px] pb-2.5 justify-start items-center  flex opacity-60  text-zinc-900 text-[13px] font-roboto">
                    {
                        isTypingObj && isTypingObj.chatId === chatInfo?.chatId ? <span className="italic font-rale text-gray-600 font-normal">typing...</span>
                            :
                            chatInfo.status ? chatInfo.status === "Online" ? chatInfo.status : <span className="font-roboto pr-[3px]">
                                {`last seen ${chatInfo.status}`}
                            </span> : null
                    }
                </section>
            </section>
        </section>
    )
}

export default ChatInfo