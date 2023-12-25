import { messageHeaderDate, messageStatus } from "../utils/compareDate"

const Message = ({ message, sender, createdAt, userId }) => {
    const formattedMessageHeaderDate = messageHeaderDate(createdAt)
    const messageStatusText = messageStatus(createdAt)
    let itemsClass, messageStatusAlign, textColor, messageContainerBg = ""
    if (sender === userId) {
        itemsClass = 'self-end'
        messageStatusAlign = 'self-start'
        textColor = 'text-zinc-100'
        messageContainerBg = 'bg-blue-600'

    } else {
        itemsClass = 'self-start'
        messageStatusAlign = 'self-end'
        textColor = 'text-zinc-600'
        messageContainerBg = 'bg-neutral-300'
    }

    return (
        <>
            <section className="w-min h-auto p-1 bg-white rounded-full border border-stone-500  items-center flex self-center text-center text-black text-sm font-normal">{formattedMessageHeaderDate}</section>

            <section className={`min-w-min flex flex-col ${itemsClass} mx-2 my-2`} >
                <section className={`${textColor} rounded-[25px] max-w-[255px] p-[8px] ${messageContainerBg}`}>
                    {message}
                </section>

                <section className={`${messageStatusAlign} text-center text-zinc-800 text-sm font-normal`}>
                    {messageStatusText}
                </section>
            </section>
        </>

    )
}

export default Message