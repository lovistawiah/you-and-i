import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const ChatTextContainer = () => {
  return (
    <section className="w-full h-[59px] px-[26px] py-[16px] bg-white border-b border-stone-400 justify-between items-center inline-flex">
      <section className="text-zinc-500  font-medium text-2xl">Chats</section>
      <FontAwesomeIcon icon={faChevronDown}
        className="text-2xl relative text-zinc-500" />
    </section>
  )
}

export default ChatTextContainer