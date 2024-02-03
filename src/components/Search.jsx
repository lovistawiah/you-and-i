import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { socket } from '../socket'


const Search = ({ eventName }) => {
    const [searchInput, setSearchInput] = useState('');
    const handleSearch = (e) => {
        setSearchInput(e.target.value);
    };
    useEffect(() => {
        const trimmedSearch = searchInput.trim()
        if (trimmedSearch) {
            socket.emit(eventName, trimmedSearch)
        }
        return () => {
            socket.removeListener(eventName)
        }
    }, [searchInput, eventName])
    const clearSearch = () => {
        setSearchInput('');
    };
    return (
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
    );
};

export default Search;
