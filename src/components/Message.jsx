import { messageHeaderDate, messageStatus } from "../utils/compareDate"

const Message = ({ message, sender, createdAt, userId }) => {
    const formattedMessageHeaderDate = messageHeaderDate(createdAt)
    const messageStatusText = messageStatus(createdAt)

    const itemsClass = `items-${sender !== userId ? 'end' : 'start'}`
    const textColor = `text-${sender === userId ? 'zinc-300' : 'neutral-100'}`
    const messageContainerBg = `bg-${sender !== userId ? 'blue-600' : 'zinc-600'}`
    console.log(messageContainerBg)
    return (
        <>
            <section className="w-min h-auto p-1 bg-white rounded-full border border-stone-500  items-center flex self-center text-center text-black text-sm font-normal">{formattedMessageHeaderDate}</section>
            <section className={`min-w-min flex flex-col ${itemsClass}`} >
                <section className={`rounded[25px] max-w-[255px] ${textColor} ${messageContainerBg}`}>{message}</section>
                <section className="text-center text-zinc-800 text-sm font-normal">{messageStatusText}</section>
            </section>
        </>

    )
}

export default Message