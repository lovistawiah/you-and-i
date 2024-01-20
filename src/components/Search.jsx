import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const Search = () => {
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const clearSearch = () => {
        setSearch('');
    };
    // TODO: search component should appear under the chat container
    return (
        <div className="h-[70px] px-2.5 flex-col justify-center items-center flex fixed top-[59px] bg-gray-50 w-full md:relative md:top-[20px]">
            <section className="relative">
                {
                    !search && (
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
                    className="w-[90%] h-9 pl-6 bg-white border-b-[1px] border-zinc-500 justify-start items-center gap-1.5 inline-flex outline-none text-base font-normal"
                    value={search}
                    onChange={handleSearch}
                />
                {search && (
                    <FontAwesomeIcon
                        icon={faTimes}
                        className="absolute right-2 top-[10px] text-zinc-500 cursor-pointer"
                        onClick={clearSearch}
                    />
                )}
            </section>
        </div>
    );
};

export default Search;
