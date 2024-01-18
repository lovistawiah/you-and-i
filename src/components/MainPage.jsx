import { useEffect, useState } from 'react'
import Settings from './Settings'
import NewContacts from './NewContacts'
import Chats from './Chats'
import Menu from './Menu'
import WelcomePage from './WelcomePage'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faGear, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { socket } from '../socket'



const MainPage = () => {
    // default to page 3 since it the Chat page
    const [isToken, setToken] = useState(true)
    const [activePage, setActivePage] = useState(3)
    const icons = [
        { iconText: "Settings", iconName: faGear },
        { iconText: "New Contacts", iconName: faUserPlus },
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
    }, [isToken])
    return (
        !isToken ? (
            <WelcomePage />
        ) : (
            <section className="bg-white relative w-screen h-screen">
                {activePage === 1 && <Settings />}
                {activePage === 2 && <NewContacts />}
                {activePage === 3 && <Chats />}
                <Menu>
                    {
                        icons.map(({ iconName, iconText }, i) => (
                            // added one to id to make number more understandable
                            <button className="flex p-1 flex-col text-zinc-600 font-rale font-medium" key={i} onClick={pageActiver} id={i + 1}>
                                <FontAwesomeIcon icon={iconName} className='pointer-events-none' />
                                {iconText}
                            </button>
                        ))
                    }
                </Menu>
            </section>
        )

    )
}
export default MainPage