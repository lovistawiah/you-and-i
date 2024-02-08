import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { faFaceSmile, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextareaAutoResize from 'react-textarea-autosize'
import { socket } from '../socket'
import { msgEvents, usrEvents } from '../utils/eventNames'
import ChatInfo from './ChatInfo'
import Messages from './Messages'
import { cancelUpdate } from '../app/messagesSlice'


const MessagePanel = () => {
    const chatInfo = useSelector((state) => state.chat.value);
    const msgToBeUpdated = useSelector((state) => state.messages.msgToBeUpdated)
    // ? a boolean to toggle the cancel button when updating
    const updateMsg = useSelector((state) => state.messages.updateMsg)
    const dispatch = useDispatch()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [showEmojis, setShowEmojis] = useState(false)
    const [message, setMessage] = useState('')
    const [formHeight, setFormHeight] = useState(0)
    const formRef = useRef(null)
    const textAreaRef = useRef(null)


    const submitForm = (e) => {
        e.preventDefault()
        if (!message) return
        // updateMsg turns true if updateSingleMsg obj is set 
        if (updateMsg) {
            const update = {
                msgId: msgToBeUpdated.msgId,
                message
            }
            socket.emit(msgEvents.updateMsg, update)
            handleCancelUpdate()
            return
        }
        const { userId, chatId } = chatInfo
        if (chatId && userId) {
            const messageObj = {
                chatId,
                message
            }
            socket.emit(msgEvents.sndMsg, messageObj)

        } else if (userId && !chatId) {
            const messageObj = {
                userId,
                message
            }
            socket.emit(msgEvents.newChat, messageObj)
        }
        setMessage("")
    }

    const onKeyDown = (e) => {
        if (e.key == "Enter" && !e.shiftKey) {
            submitForm(e)
        }
    }

    const sendMessage = (e) => {
        submitForm(e)

    }

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.innerWidth])

    const handleShowEmoji = () => {
        setShowEmojis(showEmojis ? false : true)
    }

    const getEmoji = (emojiObj) => {
        const emoji = emojiObj.native
        setMessage(message + emoji)
    }

    const handleCancelUpdate = () => {
        setMessage('')
        dispatch(cancelUpdate(true))
    }

    const handleOnChange = (e) => {
        setMessage(e.target.value)
        if (message) {
            socket.emit(usrEvents.typing, { chatId: chatInfo?.chatId })
        }
    }



    useEffect(() => {
        if (formRef.current) {
            setFormHeight(+formRef.current.clientHeight)
        }
    }, [message])

    useEffect(() => {
        setMessage('')
        if (formRef.current) {
            setFormHeight(+formRef.current.clientHeight)
        }
    }, [chatInfo])
    useEffect(() => {
        setFormHeight(59)
    }, [])
    useEffect(() => {
        if (updateMsg && msgToBeUpdated) {
            const message = msgToBeUpdated.message
            setMessage(message)
        }
    }, [updateMsg, msgToBeUpdated])
    return (
        // TODO: when window width > mobile width, show chat panel and settings if message panel is active page

        <section className={`w-full grid grid-rows-[50px_auto_${formHeight}px] bg-gray-100 order-2 border-green-950 md:relative`}>
            {
                !chatInfo ? <section className='absolute shadow w-[300px] h-[100px] font-rale font-base text-xl flex justify-center items-center md:top-[50%] md:left-[35%] top-[45%] left-[25%]'>
                    Select chat to see messages
                </section> : <>
                    <ChatInfo
                        windowWidth={windowWidth}
                        userId={chatInfo?.userId}
                    />
                    <Messages />
                    {
                        showEmojis && <section className={`absolute z-50 bottom-[${formHeight + 5}px] right-12`}>
                            <Picker data={data} onEmojiSelect={getEmoji} emojiSize={18} previewPosition={"none"} theme={"light"} />
                        </section>
                    }


                    <form ref={formRef}
                        className={`bg-red-500 flex items-end py-2 justify-center px-2 border-t `} onSubmit={sendMessage}>

                        <section className='w-full p-0 m-0 relative flex'>

                            <TextareaAutoResize className={`resize-none md:px-9 pl-2 pr-10 py-2 text-base text-zinc-700 w-full active:outline-none border outline-none bg-gray-100`}
                                value={message}
                                maxRows={3}
                                onChange={handleOnChange}
                                onKeyDown={onKeyDown}
                                placeholder='Write a message...'
                                ref={textAreaRef}
                                id='textarea'
                            />
                            {
                                windowWidth > 1000 && <FontAwesomeIcon icon={faFaceSmile} className='absolute right-4 bottom-3 text-gray-400 cursor-pointer' onClick={handleShowEmoji} />
                            }

                        </section>

                        {
                            updateMsg ? <button type='submit' onClick={handleCancelUpdate} className='w-fit  p-2 bg-orange-600 rounded-lg justify-center items-center ml-2 active:bg-orange-900 hover:bg-orange-700 flex text-white'>
                                Cancel
                            </button> : null
                        }
                        <button type='submit' className='w-[36px] h-[38px] p-2 bg-blue-600 rounded-lg justify-center items-center ml-2 active:bg-blue-900 hover:bg-blue-700 flex'>
                            <FontAwesomeIcon icon={faPaperPlane} className='text-white' />
                        </button>
                    </form>
                </>
            }
        </section>


    )
};
export default MessagePanel
