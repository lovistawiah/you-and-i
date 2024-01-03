import { messageStatus } from "../utils/compareDate"
import MessageHeaderDate from "./MessageHeaderDate"

const Message = ({ message, sender, createdAt, userId }) => {
    if (!message || !sender || !createdAt || !userId) return
    const messageStatusText = messageStatus(createdAt)
    let itemsClass, messageStatusAlign, textColor, messageContainerBg = ""
    if (sender === userId) {
        itemsClass = 'self-start'
        messageStatusAlign = 'self-end'
        textColor = 'text-zinc-600'
        messageContainerBg = 'bg-zinc-200'

    } else {
        itemsClass = 'self-end'
        textColor = 'text-zinc-100'
        messageStatusAlign = 'self-end'
        messageContainerBg = 'bg-blue-600'
    }

    return (
        <>
            <MessageHeaderDate
                messageDate={createdAt}
            />

            <section className={`min-w-min flex flex-col ${itemsClass} mx-2 my-2`} >
                <section className={`${textColor} rounded-[25px] max-w-[255px] text-sm p-[8px] mb-[3px] ${messageContainerBg}`}>
                    {message}
                </section>

                <section className={`${messageStatusAlign} text-center text-zinc-800 text-[13px] mb-1 font-normal`}>
                    {messageStatusText}
                </section>
            </section>
        </>

    )
}

export default Message