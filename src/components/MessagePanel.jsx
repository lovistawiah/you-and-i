import { useRef, useState } from 'react'
import { socket } from '../socket'

import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import TextareaAutoResize from 'react-textarea-autosize'
import { messageEvents } from '../utils/eventNames'
import ChatInfo from './ChatInfo'
import Messages from './Messages'
const MessagePanel = () => {
    const [message, setMessage] = useState('')
    const [formSubmitted, setFormSubmitted] = useState(false)
    const chatInfo = useSelector((state) => state.chatInfo.value);
    const formRef = useRef()

    const submitForm = (e) => {
        e.preventDefault()
        const { userId } = chatInfo
        if (!message) return
        if (userId) {
            const messageObj = {
                userId,
                message
            }
            socket.emit(messageEvents.sendMessage, messageObj)
            setFormSubmitted(true)
        }
        setMessage("")
        setFormSubmitted(false)
    }

    const onKeyDown = (e) => {
        if (e.key == "Enter" && !e.shiftKey) {
            submitForm(e)
        }
    }

    const sendMessage = (e) => {
        submitForm(e)
    }
    return (
        <section className="w-full h-screen grid grid-rows-5">
            <ChatInfo
                avatarUrl={chatInfo.avatarUrl}
                onlineStatus={"online"}
                username={chatInfo.username}
            />

            <Messages
                formSubmitted={formSubmitted}
                formRef={formRef}
            />

            <form ref={formRef}
                className="fixed bottom-0 p-1  pl-4 min-h-[50px] max-h-[90px] w-full flex items-end  justify-start row-span-1 border border-t" onSubmit={sendMessage}>
                <TextareaAutoResize className='resize-none px-1 py-1 text-sm text-zinc-700 w-[80%] active:outline-none border rounded border-zinc-600 outline-none focus:border-zinc-700'
                    value={message}
                    maxRows={3}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={onKeyDown}
                />
                <button type='submit' className='w-[28px] h-[28px] p-1 bg-blue-600 rounded-[50px] justify-center items-center ml-2 active:bg-blue-900 hover:bg-blue-700 flex'>
                    <FontAwesomeIcon icon={faPaperPlane} className='text-white' />
                </button>
            </form>
        </section>
    )
}
export default MessagePanel

