import { useEffect, useState } from 'react'
import Settings from './Settings'
import NewContacts from './NewContacts'
import Chats from './Chats'
import Menu from './Menu'
import WelcomePage from './WelcomePage'
import MessagePanel from './MessagePanel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faGear, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { socket } from '../socket'



const MainPage = () => {
    // default to page 3 since it the Chat page
    const [isToken, setToken] = useState(true)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [activePage, setActivePage] = useState(3)
    const icons = [
        { iconText: "Settings", iconName: faGear },
        { iconText: "Contacts", iconName: faUserPlus },
        { iconText: "Chats", iconName: faComments },
    ]
    const pageActiver = (e) => {
        setActivePage(+e.target.id)

    }
    useEffect(() => {
        socket.on('connect_error', (data) => {
            if (data) {
                setToken(false)
            }
        })
        return () => {
            socket.off('connect_error')
        }
    }, [isToken])
    useEffect(() => {

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        console.log(windowWidth)
    }, [window.innerWidth])
    return (
        !isToken ? (
            <WelcomePage />
        ) : (
            <section className="relative w-screen h-screen md:flex md:flex-row flex">
                {activePage === 1 && <Settings />}
                {activePage === 2 && <NewContacts />}
                {activePage === 3 && <Chats />}
                <Menu>
                    {
                        icons.map(({ iconName, iconText }, i) => (
                            // added one to id to make number more understandable
                            <button className={`flex p-1 flex-col text-zinc-600 font-rale font-normal md:justify-center md:my-2 md:items-center ${iconText === "Chats" ? 'md:order-1' : iconText === 'Contacts' ? 'md:order-2' : 'md:order-3'} ${iconText === 'Settings' ? 'md:mt-auto' : ''} text-base`} key={i} onClick={pageActiver} id={i + 1}>
                                <FontAwesomeIcon icon={iconName} className='pointer-events-none self-center' />
                                {iconText}
                            </button>
                        ))
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