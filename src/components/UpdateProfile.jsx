import { useState } from 'react'
import { faArrowRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import InfoContainer from './InfoContainer'
import Transition from './Transition'
import useUpdateProfile from '../hooks/useUpdateProfile'

const UpdateProfile = () => {
    const [usernameInput, setUsernameInput] = useState("")
    const { windowWidth, handleUserInfo, info, setInfo, navigate, personInfo } = useUpdateProfile()

    const handleUsernameInput = (e) => {
        setUsernameInput(e.target.value)
    }

    const goBack = () => {
        navigate('/register')
    }

    const inputRegex = /^[a-zA-Z0-9.@_]*$/;
    return (
        <Transition>
            <section className="w-screen">
                <InfoContainer info={info} setInfo={setInfo} />
                <section className='flex justify-between md:block mt-2 w-full'>
                    {   //show back arrow on mobile device
                        windowWidth < 640 && <FontAwesomeIcon icon={faChevronLeft} className="cursor-pointer hover:bg-gray-100 hover:rounded-full p-2 ml-2" onClick={goBack} />
                    }
                    <section className='text-center text-xl font-rale font-medium p-1 w-full'>User Profile</section>
                </section>
                {/* profile pic */}
                <section className='w-[200px] mt-[70px] m-auto flex justify-center items-center'>
                    <section className="relative w-[100px] h-[100px] ">
                        <img src={personInfo?.avatarUrl} alt="" className='rounded-full object-cover border-[2px] border-blue-200 w-full h-full' />
                    </section>
                </section >

                {/* user information */}
                <section className="text-center font-rale text-lg font-medium pt-4 w-fit m-auto">{personInfo?.username}
                </section>
                <section className="text-center font-rale text-sm font-light text-gray-500 w-fit m-auto">
                    {personInfo?.bio}
                </section>

                <form className="w-full h-fit flex mt-[35px] flex-col items-center gap-4" onSubmit={handleUserInfo}>

                    <input type="text" name="username" className={`w-[275px] h-[36px] py-[1px] pr-0 pl-[4px] bg-white border-b border-zinc-500 text-base font-normal text-neutral-700 active:border-zinc-800 outline-none md:w-[400px] ${!inputRegex.test(usernameInput) ? 'text-red-500 bg-red-50' : ''}`} id="username" placeholder={personInfo?.username} required onChange={handleUsernameInput} />

                    <button className={`w-[100px] h-[33px] px-3.5 py-[7px] font-rale  bg-blue-500 rounded-[5px] border flex items-center justify-center text-white text-base font-normal hover:bg-blue-600 active:bg-blue-700 outline-none md:w-[250px] md:text-lg disabled:bg-red-500 disabled:cursor-not-allowed ${usernameInput == "" ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-600' : ''}`}
                        disabled={!inputRegex.test(usernameInput)}
                    >Next <FontAwesomeIcon icon={faArrowRight} className='pl-1' />
                    </button>
                </form>
            </section >
        </Transition>

    )
}

export default UpdateProfile