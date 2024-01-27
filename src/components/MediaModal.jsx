import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { socket } from '../socket'
import { messageEvents } from '../utils/eventNames'

const MediaModal = ({ show }) => {
    const chatInfo = useSelector((state) => state.chatInfo.value);
    const [, setSelectedFile] = useState(null)

    function sendMediaMessage(arrayBuffer, fileName, fileType) {
        const { userId } = chatInfo
        if (!userId && !fileName && !fileType) return
        const messageObj = {
            userId,
            message: {
                arrayBuffer,
                fileName,
                fileType
            }
        }
        console.log(messageObj)
        socket.emit(messageEvents.sendMessage, messageObj)
        console.log("sent")
    }
    const handleFileSelection = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.readyState == 2) {
                const arrayBuffer = reader.result;
                sendMediaMessage(arrayBuffer, file.name, file.type)
            }
        };
        reader.readAsArrayBuffer(file);
    };
    return (
        show &&
        <div className='w-fit px-2 py-3 h-fit absolute bottom-[90px] text-transparent items-center left-6 flex flex-col gap-1'>
            {/*  eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor='fileInput' className='bg-green-400 w-fit h-fit'>
                <span className='relative'>
                    <FontAwesomeIcon icon={faImage} className='text-xl text-white bg-blue-600 p-[10px] rounded-full ' />
                    <input type="file" name="" onChange={handleFileSelection} id="fileInput" className='bg-yellow-500 ' />

                </span>
            </label>
        </div>
    )
}

export default MediaModal