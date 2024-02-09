import PageHeader from './PageHeader'
import Chat from './Chat'
import useChats from '../hooks/useChats'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'


const MainPage = ({ windowHeight }) => {
    const { searchInput, setSearchInput } = useChats()
    const chats = useSelector((state) => searchInput.length > 0 ? state.chats.searchChats : state.chats.chats)

    const handleSearch = (e) => {
        setSearchInput(e.target.value);
    };

    const clearSearch = () => {
        setSearchInput('');
    };

    return (

        <section
            className={`order-2 h-[${windowHeight}px] w-full md:border-r md:w-[55%] relative`}>
            <PageHeader pageName={"Chats"} />

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
                        name="search"
                        placeholder="Search"
                        id="search"
                        className="w-full h-9 pl-6 bg-white border-b-[1px] border-zinc-500 justify-start items-center gap-1.5 inline-flex outline-none text-base font-normal"
                        value={searchInput}
                        onChange={handleSearch}
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

            <div className="overflow-y-auto mt-[129px] absolute top-2 bottom-[56px] left-0 right-0 w-full md:bottom-1">
                {
                    Array.isArray(chats) && chats.length > 0 ?
                        chats.map((chat) => (
                            <Chat
                                key={chat.Id}
                                chatId={chat.Id}
                                avatarUrl={chat.avatarUrl}
                                lstMsgDate={chat.lstMsgDate}
                                lastMessage={chat.lastMessage}
                                userId={chat.userId}
                                username={chat.username}
                            />
                        )) :
                        <section className='text-center font-roboto font-bold text-lg'>
                            No chats found
                        </section>
                }
            </div>
        </section>


    )
}
export default MainPage