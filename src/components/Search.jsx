import { faClose, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

const Search = () => {
    const [search, setSearch] = useState("")
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    const clearSearch = () => {
        setSearch("")
    }
    return (
        <div className="w-full h-[70px] px-2.5 bg-white flex-col justify-center items-center gap-2.5 inline-flex">
            <section className="relative">
                <FontAwesomeIcon icon={faMagnifyingGlass}
                    className='absolute top-[10px] left-1 text-zinc-500'
                />
                <input type="text" name="" placeholder='Search' id="" className='w-[300px] h-9 pl-6  bg-white rounded-[20px] border border-zinc-500 justify-start items-center gap-1.5 inline-flex outline-none text-base font-normal' onKeyUp={handleSearch} />
                {search && <FontAwesomeIcon icon={faClose}
                    className='absolute right-2 top-[10px] text-zinc-500'
                    onClick={clearSearch}
                />}
            </section>
        </div>
    )
}

export default Search