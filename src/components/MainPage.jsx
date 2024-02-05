import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faGear, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from "react-redux"
import Settings from './Settings'
import Contacts from './Contacts'
import Chats from './Chats'
import Menu from './Menu'
import WelcomePage from './WelcomePage'
import MessagePanel from './MessagePanel'
import { socket } from '../socket'

const MainPage = () => {
    const [isToken, setToken] = useState(true)
    const [errMsg, setErrMsg] = useState("")
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [activePage, setActivePage] = useState(3)
    const userAvatar = useSelector((state) => state.user.value?.avatarUrl) ?? ""
    const icons = [
        { iconText: "Settings", iconName: faGear },
        { iconText: "Contacts", iconName: faUserPlus },
        { iconText: "Chats", iconName: faComments },
    ]
    const pageSelector = (e) => {
        setActivePage(+e.target.id)

    }
    useEffect(() => {
        socket.on('connect_error', (data) => {
            if (data) {
                const message = data.message
                setErrMsg(message)
                setToken(false)
            } else {
                setToken(true)
            }
        })
        const handleConnect = () => {
            setToken(true)
        }
        socket.on("connect", handleConnect)
        return () => {
            socket.off('connect_error')
            socket.off('connect', handleConnect)
        }
    }, [])

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

    }, [])
    return (
        !isToken ? (
            <WelcomePage message={errMsg} />
        ) : (
            <section className="relative w-screen h-screen md:flex md:flex-row flex">
                {activePage === 1 && <Settings />}
                {activePage === 2 && <Contacts />}
                {activePage === 3 && <Chats />}
                <Menu>
                    {
                        icons.map(({ iconName, iconText }, i) => (
                            // added one to id to make number more understandable
                            <button className={`flex p-1 flex-col text-zinc-600 font-rale font-normal md:justify-center md:my-2 md:items-center ${iconText === "Chats" ? 'md:order-1' : iconText === 'Contacts' ? 'md:order-2' : 'md:order-3'} text-base`} key={i} onClick={pageSelector} id={i + 1}>
                                <FontAwesomeIcon icon={iconName} className='pointer-events-none self-center' />
                                {iconText}
                            </button>
                        ))
                    }
                    {
                        windowWidth > 768 && <section className="w-[32px] h-[32px] self-center justify-center items-center flex shrink-0 order-4 mt-auto my-2 ">
                            <img src={userAvatar} alt="user dp" className='rounded-full' />
                        </section>
                    }
                </Menu>
                {
                    windowWidth > 768 ? (
                        <MessagePanel />
                    ) : null
                }
            </section>

        )

    )
}
export default MainPage