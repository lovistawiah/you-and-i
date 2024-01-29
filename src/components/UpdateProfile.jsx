import { faCameraAlt, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PersonInfo } from '../utils/fakerWork'
import InputForm from './InputForm'
import { updateUserProfile } from '../account/User'


const UpdateProfile = () => {
    const navigate = useNavigate()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [imgSrc, setImgSrc] = useState("https://via.placeholder.com/24X24")
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.innerWidth])
    const goBack = () => {
        navigate('/register')
    }
    const handleProfilePic = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        // TODO: re-write to add error holder 
        const userId = localStorage.getItem('userId')
        if (userId) {
            const formData = new FormData()
            formData.append('image', file)
            formData.append('userId', userId)
            const result = await updateUserProfile(formData)
            if (result.message) {
                setImgSrc(result.url)
            }
        }
        // TODO: create error holder that appears above the entire page
    }

    return (
        <section className="w-screen h-screen">
            <section className='flex justify-between md:block mt-2 w-full'>
                {   //show back arrow on mobile device
                    windowWidth < 640 && <FontAwesomeIcon icon={faChevronLeft} className="cursor-pointer hover:bg-gray-100 hover:rounded-full p-2 ml-2" onClick={goBack} />
                }
                <section className='text-center text-xl font-rale font-medium p-1 w-full'>User Profile</section>
            </section>
            {/* profile pic */}
            <section className='w-[200px] mt-[70px] m-auto flex justify-center items-center'>
                <section className="relative w-[100px] h-[100px] ">
                    <img src={imgSrc} alt="" className='rounded-full object-cover border-[3px] border-blue-200 w-full h-full' />
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control  */}
                    <label htmlFor='fileInput' className='absolute right-0 bottom-0'>
                        <span className='relative'>
                            <FontAwesomeIcon icon={faCameraAlt} className='text-lg text-white bg-blue-400 p-[8px] rounded-full ' />
                            <input type="file" name="file" id="fileInput" className='w-0 invisible' onChange={handleProfilePic} />
                        </span>
                    </label>
                </section>
            </section >

            {/* user information */}
            <section className="text-center font-rale text-lg font-medium pt-4 w-fit m-auto">{PersonInfo().username}
            </section>
            <section className="text-center font-rale text-sm font-light text-gray-500 w-fit m-auto">{PersonInfo().username}
            </section>

            <form className="w-full h-fit flex mt-[35px] flex-col items-center gap-4">
                <InputForm
                    id={'username'}
                    type={'text'}
                    name={'username'}
                    placeholder={'Username'}
                />
                <InputForm
                    id={'bio'}
                    type={'text'}
                    name={'bio'}
                    placeholder={'Bio'}
                />
                <button className='w-[100px] h-[33px] px-3.5 py-[7px] font-rale  bg-blue-600 rounded-[5px] border border-neutral-500 flex items-center justify-center text-white text-base font-normal hover:bg-blue-700 active:bg-blue-800 outline-none  md:w-[300px] md:text-lg '
                >Update
                </button>
            </form>

        </section >
    )
}

export default UpdateProfile