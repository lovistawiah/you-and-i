import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { faArrowRight, faCameraAlt, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { updateUserInfo, updateUserProfile } from '../account/User'
import InfoContainer from './InfoContainer'
import { setUserInfo } from '../app/userSlice'

const UpdateProfile = () => {
    const user = useSelector((state) => state.user.value)
    const navigate = useNavigate()
    const [personInfo, setPersonInfo] = useState(user)
    const [usernameInput, setUsernameInput] = useState("")
    const [info, setInfo] = useState({})
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const dispatch = useDispatch()

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.innerWidth])
    useEffect(() => {
        if (!user) {
            window.location.replace('/')
        }

    }, [navigate, user])

    const handleUsernameInput = (e) => {
        setUsernameInput(e.target.value)
    }
    const goBack = () => {
        navigate('/register')
    }

    const handleProfilePic = async (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        if (!file) {
            setInfo({
                type: 'error',
                message: 'file not selected'
            })
        }
        const { userId } = personInfo
        if (userId) {
            const formData = new FormData()
            formData.append('image', file)
            formData.append('userId', userId)
            const result = await updateUserProfile(formData)

            if (result.status === 200) {
                setPersonInfo({
                    ...personInfo,
                    avatarUrl: result.url
                })
                setInfo({
                    type: "ok",
                    message: result.message
                })
                const updatedUserInfo = {
                    ...personInfo,
                    avatarUrl: result.url
                }
                dispatch(setUserInfo(updatedUserInfo))
            }

        } else {
            setInfo({
                type: "error",
                message: "user does not exist"
            })
        }
    }

    const handleUserInfo = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const formObj = {
            username: formData.get('username'),
            userId: personInfo.userId
        }
        if (!formObj.userId) {
            setInfo({ type: "error", message: "Unknown error, try again" })
            return
        }
        if (formObj.username.length < 5) {

            setInfo({ type: "error", message: "username should be 5 characters or more" })
            return
        }

        const userObj = await updateUserInfo(formObj)
        if (userObj.status === 200) {
            setPersonInfo({
                ...personInfo,
                username: userObj.userInfo.username
            })

            dispatch(setUserInfo({
                ...personInfo,
                username: userObj.userInfo.username
            }))
        } else {
            setInfo({
                type: "ok",
                message: userObj.message
            })
        }
        navigate('/')
    }
    const inputRegex = /^[a-zA-Z0-9.@]*$/;
    return (
        <section className="w-screen h-screen">
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
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control  */}
                    <label htmlFor='fileInput' className='absolute right-0 bottom-0 hidden'>
                        <span className='relative'>
                            <FontAwesomeIcon icon={faCameraAlt} className='text-lg text-white bg-blue-400 p-[8px] rounded-full ' />
                            <input type="file" name="file" id="fileInput" className='w-0 hidden' onChange={handleProfilePic} disabled={true} />
                        </span>
                    </label>
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

                <button className={`w-[100px] h-[33px] px-3.5 py-[7px] font-rale  bg-blue-600 rounded-[5px] border flex items-center justify-center text-white text-base font-normal hover:bg-blue-700 active:bg-blue-800 outline-none md:w-[250px] md:text-lg disabled:bg-red-500 disabled:cursor-not-allowed ${usernameInput == "" ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-600' : ''}`}
                    disabled={!inputRegex.test(usernameInput)}
                >Next <FontAwesomeIcon icon={faArrowRight} className='pl-1' />
                </button>
            </form>
        </section >
    )
}

export default UpdateProfile