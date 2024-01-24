import { useEffect, useState } from 'react'
import { useDispatch } from "react-redux"
import { socket } from '../socket'
import { channelEvents } from '../utils/eventNames'
import Search from './Search'
import PageHeader from './PageHeader'
import { chatInfo } from '../app/chatInfoSlice'
import { Link } from 'react-router-dom'


const NewContacts = () => {
    const dispatch = useDispatch()
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        const getContacts = (data) => {
            setContacts(data)
        }
        socket.emit(channelEvents.contacts, {})
        socket.on(channelEvents.contacts, getContacts)
        return () => {
            socket.off(channelEvents.contacts)
        }
    }, [])
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const handleUserInfo = ({ userId, channelId, avatarUrl, username }) => {
        const chatObj = {
            userId,
            channelId,
            avatarUrl,
            username,
        }
        dispatch(chatInfo(chatObj))
    }
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.innerWidth])
    return (
        <section className='order-2 w-full md:w-[40%] relative'>
            <PageHeader pageName={"Contacts"} />
            <Search />
            <section className='overflow-y-auto mt-[129px] absolute top-2 bottom-[56px] left-0 right-0 w-full md:bottom-1'>
                {
                    contacts?.map((contact) => (
                        <Link to={`/${windowWidth < 768 ? 'messages' : ''}`} onClick={() => handleUserInfo({ userId: contact._id, username: contact.username, avatarUrl: contact.avatarUrl, channelId: contact?.channelId })} className="w-full justify-start items-center flex" key={contact._id} >
                            <section className="w-[70px] h-[65px] p-2.5 justify-center items-center flex shrink-0">
                                <img src={contact.avatarUrl} alt="user profile" className='rounded-full' />
                            </section>
                            <section className="py-1 flex flex-col w-full gap-[0px] border-b border-neutral-400">
                                <h4 className='h-[24.50px] pt-1 text-zinc-950 text-base font-medium'>
                                    {contact.username}
                                </h4>
                                <section className="text-neutral-400 text-sm font-normal line-clamp-2 text-ellipsis w-full flex-grow basis-0 pt-[4px] pr-0 pb-[40px] pl-1">
                                    bio
                                </section>
                            </section>
                        </Link >
                    ))
                }
            </section>
        </section>
    )
}
export default NewContacts