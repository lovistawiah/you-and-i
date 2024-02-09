import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../app/userSlice'
import { login } from '../account/User'
import WelcomeText from './WelcomeText'
import InputForm from './InputForm'
import InfoContainer from './InfoContainer'
import Transition from './Transition'
import Logo from './Logo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { persistor } from '../app/store'

const Login = () => {
    const [info, setInfo] = useState({})
    const [spin, setSpin] = useState(false)
    const dispatch = useDispatch()

    const saveUserInfoAndNavigate = (userObj) => {
        if (!userObj) return
        setSpin(false)
        dispatch(setUserInfo(userObj))
        location.href = location.origin + '/'
    }
    const errorLogger = ({ message }) => {
        setInfo({ type: 'error', message })
        setSpin(false)
    }

    useEffect(() => {
        persistor.purge()
    }, [])
    return (
        <Transition>
            <InfoContainer info={info} setInfo={setInfo} />
            <div className='w-screen h-screen py-[23px] px-[6px] flex flex-col items-center gap-4 justify-center'>
                <Logo />
                <WelcomeText />
                <form className='flex flex-col items-center gap-[21px]'
                    onSubmit={async (e) => {
                        e.preventDefault()
                        setSpin(true)
                        const formData = new FormData(e.target)
                        const obj = {
                            usernameEmail: formData.get('username-email'),
                            password: formData.get('password')
                        }
                        const result = await login(obj)
                        result?.status !== 200 ? errorLogger({ message: result?.message }) : saveUserInfoAndNavigate(result.userInfo)
                    }}
                >
                    <InputForm
                        name={"username-email"}
                        type={"text"}
                        placeholder={"Username or Email"}
                        id={"username-email"}
                    />
                    <InputForm
                        name={"password"}
                        placeholder={"Password"}
                        id={"password"}
                        type={"password"}
                    />
                    <button className={`w-[200px] h-[33px] px-3.5 py-[7px] font-roboto bg-blue-500 rounded-[5px] border flex items-center justify-center text-white text-base font-normal  hover:bg-blue-600 active:bg-blue-700 outline-none  md:w-[300px] md:text-lg disabled:cursor-not-allowed`} disabled={spin}
                    >
                        {
                            spin ? <><FontAwesomeIcon icon={faCircleNotch} className="animate-spin" /> <span className="pl-1">Processing...</span></> : <>Login</>
                        }
                    </button>
                </form>
                <section className='h-9 px-[31px] py-[9px] bg-white justify-center items-center gap-1 inline-flex text-base md:text-lg'>
                    New Account? <Link to='/register' className='text-blue-500 hover:underline'>Register</Link>
                </section>
            </div>
        </Transition>
    )
}

export default Login