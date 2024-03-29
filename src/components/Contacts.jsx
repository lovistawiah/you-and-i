import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import PageHeader from './PageHeader'
import { setChatInfo } from '../app/chatSlice'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import useContact from '../hooks/useContact'
import { clearMessages } from '../app/messagesSlice'


const Contacts = ({ windowHeight }) => {
    const dispatch = useDispatch()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const { searchInput, setSearchInput } = useContact()
    // return search users else the original list
    const contacts = useSelector((state) => searchInput.length > 0 ? state.contacts.searchedContacts : state.contacts.contacts)

    const clearSearch = () => {
        setSearchInput('');
    };
    const handleUserInfo = ({ userId, chatId, avatarUrl, username }) => {
        const chatObj = {
            userId,
            chatId,
            avatarUrl,
            username,
            status
        }
        dispatch(clearMessages())
        dispatch(setChatInfo({}))
        dispatch(setChatInfo(chatObj))

    }
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.innerWidth])
    const cachedContacts = useMemo(() => contacts, [contacts])

    return (
        <section className={`order-2 w-full md:w-[55%] h-[${windowHeight}px] relative`}>
            <PageHeader pageName={"Contacts"} />

            <div className="h-[70px] px-2.5 flex-col justify-center items-center flex fixed top-[59px] bg-gray-50 w-full md:relative md:top-[10px]">
                <section className="relative w-[90%]">
                    {
                        !searchInput && (
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="absolute top-[10px] left-1 text-zinc-500"
                            />
                        )
                    }
                    <input
                        type="text"
                        name=""
                        placeholder="Search"
                        id=""
                        className="w-full h-9 pl-6 bg-white border-b-[1px] border-zinc-500 justify-start items-center gap-1.5 inline-flex outline-none text-base font-normal"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    {searchInput && (
                        <FontAwesomeIcon
                            icon={faTimes}
                            className="absolute right-3 top-[10px] text-zinc-500 cursor-pointer"
                            onClick={clearSearch}
                        />
                    )}
                </section>
            </div>

            <section className='overflow-y-auto mt-[129px] absolute top-2 bottom-[56px] left-0 right-0 w-full md:bottom-1'>
                {
                    cachedContacts?.map((contact) => (
                        <Link to={`/${windowWidth < 768 ? 'messages' : ''}`} onClick={() => handleUserInfo({ userId: contact.Id, username: contact.username, avatarUrl: contact.avatarUrl, status: contact.status, chatId: contact?.chatId })} className="w-full justify-start items-center flex" key={contact.Id} >
                            <section className="w-[70px] h-[65px] p-2.5 justify-center items-center flex shrink-0">
                                <img src={contact.avatarUrl} alt="user profile" className='rounded-full' />
                            </section>
                            <section className="py-1 flex flex-col w-full gap-[0px] border-b border-neutral-400">
                                <h4 className='h-[24.50px] pt-1 text-zinc-950 text-base font-medium'>
                                    {contact.username}
                                </h4>
                                <section className="text-neutral-400 text-sm font-normal line-clamp-2 text-ellipsis w-full flex-grow basis-0 pt-[4px] pr-0 pb-[40px] pl-1">
                                    {contact.bio}
                                </section>
                            </section>
                        </Link >
                    ))
                }
            </section>
        </section>
    )
}
export default Contacts