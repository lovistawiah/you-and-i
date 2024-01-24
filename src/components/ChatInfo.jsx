import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { socket } from "../socket"
import { userEvents } from "../utils/eventNames"
const ChatInfo = ({ avatarUrl, username, windowWidth, userId }) => {
    const [status, setStatus] = useState({})
    const navigate = useNavigate()
    const goBack = () => {
        navigate('/')
    }
    useEffect(() => {
        socket.emit(userEvents.status, userId)
        socket.on(userEvents.status, (userStatus) => {
            setStatus(userStatus)
        })
    }, [userId])
    return (
        <section className=" flex justify-between items-center w-full absolute top-0 z-10 row-span-1 bg-white pl-2 border-b py-1">
            {   //show back arrow on mobile device
                windowWidth < 640 && <FontAwesomeIcon icon={faChevronLeft} className="cursor-pointer hover:bg-gray-100 hover:rounded-full p-2 m-2" onClick={goBack} />
            }
            <section className="w-[50px] h-[50px] justify-between items-center flex">
                <img src={avatarUrl} alt="user profile" className="object-contain w-fit h-fit rounded-full" />
            </section>
            <section className="w-full h-[50px] flex-col justify-between items-center flex pt-2">
                <section className="w-full h-[25px] px-[5px] text-zinc-800 text-base pt-[1px] font-bold font-rale">{username}
                </section>
                <section className="w-full h-[20px] px-[5px] pb-2.5 justify-start items-center  flex opacity-60  text-zinc-800 text-[13px] font-rale">{status?.userId === userId ? status.status : ''}
                </section>
            </section>
        </section>
    )
}

export default ChatInfo