
import { format } from "date-fns"
const Message = ({ message, sender, createdAt, userId }) => {
    if (!message || !sender || !createdAt || !userId) return
    const messageStatusText = format(createdAt, 'h:mm a')
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
        <section className={`min-w-min flex flex-col ${itemsClass} mx-2 my-2`} >
            {
                !message.startsWith('https://storage.googleapis.com/you-and-i-testing/media/images') ?
                    <section className={`${textColor} rounded-[25px] max-w-[300px] text-start text-sm p-[8px] mb-[3px] ${messageContainerBg}`}>
                        {message}
                    </section> : <section className="max-w-[300px]">
                        <img src={message} alt="" className="w-full h-full object-contain rounded" />
                    </section>

            }

            <section className={`${messageStatusAlign} text-center text-zinc-600 text-[13px] mb-1 font-normal`}>
                {messageStatusText}
            </section>
        </section>

    )
}

export default Message