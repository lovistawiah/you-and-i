import { faCameraAlt, } from '@fortawesome/free-solid-svg-icons';
import PageHeader from './PageHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux'
import { userSettings } from '../account/User';
import { useEffect, useState } from 'react';
import { persistor } from '../app/store'
import InfoContainer from './InfoContainer';
import PasswordInput from './PasswordInput';
import SettingsPassword from './SettingsPassword';
const Settings = () => {
    const [isPassValid, setIsPassValid] = useState(true)
    const [info, setInfo] = useState({})
    const userInfo = useSelector((state) => state.user.value)
    const [usernameInput, setUsernameInput] = useState("")

    const handleUsernameInput = (e) => {
        setUsernameInput(e.target.value)
    }
    const inputRegex = /^[a-zA-Z0-9.@_]*$/;

    useEffect(() => {
        if (!isPassValid) {
            setInfo({
                type: 'error',
                message: `<ul>
                <li class="text-lg mb-1 text-red-500">Password should:</li>
                  <li>At least contain 8 characters long</li>
                  <li>Contain at least one uppercase letter</li>
                  <li>Contain at least one lowercase letter</li>
                  <li>Contain at least one digit</li>
                  <li>Contain at least one special character (such as @$!%*?&,+><)</li>
                  </ul>`
            })
        } else {
            setInfo({})
        }
    }, [isPassValid])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const username = formData.get('username')
        const bio = formData.get('bio')
        const currentPassword = formData.get('password')
        const newPassword = formData.get('new-password')
        const confirmPassword = formData.get('confirm-password')
        const userObj = {
            userId: userInfo?.userId,
            username,
            bio,
            currentPassword,
            newPassword,
            confirmPassword
        }
        const result = await userSettings(userObj)
        if (result.status === 200) {
            setInfo({
                type: "ok",
                message: result.message
            })
        } else {
            setInfo({ type: 'error', message: result.message })
        }
    }
    const handleLogout = async () => {
        await persistor.purge()
        localStorage.clear()
        location.href = location.origin + '/login'
    }
    return (
        <section className={`order-2 md:border-r md:w-[55%] relative w-full`}>
            <InfoContainer info={info} setInfo={setInfo} />
            <PageHeader pageName={"Settings"} />
            <section className='flex absolute items-start flex-col m-auto w-full overflow-y-auto bottom-[60px] pb-[40px] top-[60px]'>
                {/* profile pic */}

                <button className='self-end border p-1 bg-red-50 text-red-700 mr-8 cursor-pointer rounded hover:bg-red-200 font-roboto' onClick={handleLogout}>
                    Log out
                </button>

                <section className='w-[200px] flex justify-center items-center self-center font-roboto'>
                    <section className="relative w-[80px] h-[80px] ">
                        <img src={userInfo?.avatarUrl} alt="" className='rounded-full object-contain border-[3px] border-blue-200 w-full h-full' />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control  */}
                        <label htmlFor='fileInput' className='absolute right-0 bottom-0'>
                            <span className='relative hidden'>
                                <FontAwesomeIcon icon={faCameraAlt} className='text-lg text-white bg-blue-400 p-[8px] rounded-full ' />
                                <input type="file" name="" id="fileInput" className='w-0 invisible' />
                            </span>
                        </label>
                    </section>
                </section >

                {/* user information */}
                <section className="font-roboto text-l font-medium pt-2 w-fit self-center">{userInfo?.username} </section>
                <section className="self-center font-roboto text-sm font-light text-gray-500 w-fit">{userInfo?.bio} </section>

                <form className="w-full flex mt-[20px] flex-col items-center gap-4 font-roboto" onSubmit={handleSubmit}>

                    <input type="text" name="username" className={`h-[36px] py-[1px] pr-0 pl-[4px] bg-white border-b border-zinc-500 text-base font-normal text-neutral-700 active:border-zinc-800 outline-none min-w-[250px] max-w-[300px] ${!inputRegex.test(usernameInput) ? 'text-red-500 bg-red-500' : ''}`} id="username" placeholder="Change username" onChange={handleUsernameInput} />

                    <input type="text" name="bio" className="h-[36px] py-[1px] pr-0 pl-[4px] bg-white border-b border-zinc-500 text-base font-normal text-neutral-700 active:border-zinc-800 outline-none min-w-[250px] max-w-[300px]" id="bio" placeholder="Bio" />

                    {/* passwords */}
                    <section className="mt-3 flex flex-col gap-3">
                        <section className="my-1 text-xl">Passwords</section>
                        <PasswordInput isValid={isPassValid} setIsValid={setIsPassValid} label={'Current Password'} key={'current-password'} />

                        <SettingsPassword label={'New Password'} name={'new-password'} placeholder={'New password'} key={'new-password'} />

                        <SettingsPassword label={'Confirm Password'} name={'confirm-password'} placeholder={'Confirm password'} />
                    </section>
                    <button className='w-[128px] h-[33px] px-3.5 py-[7px] font-roboto  bg-blue-600 rounded-[5px] border border-neutral-500 flex items-center justify-center text-white text-base font-normal hover:bg-blue-700 active:bg-blue-800 outline-none  '
                    >Update
                    </button>
                </form>
            </section>
        </section>
    )
}
export default Settings