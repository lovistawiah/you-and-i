import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ChatInfo = ({ avatarUrl, username, onlineStatus }) => {
    return (
        <section className="fixed top-0 h-[50px] flex items-center w-full justify-start bg-white">
            <FontAwesomeIcon icon={faChevronLeft} className="cursor-pointer hover:bg-gray-100 hover:rounded-full ml-2 p-2" />
            <section className="h-[50px] ml-2">
                <img src={avatarUrl} alt="user db" className="w-12 h-12 rounded-full bg-blue-50 p-1" />
            </section>
            <section className="h-[50px] w-full border-b border-neutral-400 flex flex-col">
                <section className="h-[25px] px-[10px] text-zinc-800 text-base pt-1 font-rale font-semibold">{username}
                </section>
                <section className="h-[25px] px-[10px] opacity-60 text-zinc-800 text-[15px] font-rale font-light">{onlineStatus}
                </section>
            </section>
        </section>
    )
}

export default ChatInfo