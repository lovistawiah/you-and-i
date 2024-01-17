import { Link } from "react-router-dom"

const LinkText = ({ linkName }) => {
    return (
        <Link to={`/${linkName.toLowerCase()}`} className='w-fit h-[33px] md:w-[120px] md:h-[36px] md:text-xl px-3.5 py-[7px] bg-blue-600 rounded-[5px] border border-neutral-500 flex items-center justify-center text-white text-base font-normal hover:bg-blue-700 active:bg-blue-800 outline-none'>{linkName}
        </Link>
    )
}

export default LinkText