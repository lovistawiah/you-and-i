import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../app/userSlice'
import { login } from '../account/User'
import WelcomeText from './WelcomeText'
import InputForm from './InputForm'
import FormButton from './FormButton'
import InfoContainer from './InfoContainer'
import Transition from './Transition'
import Logo from './Logo'

const Login = () => {
    const [info, setInfo] = useState({})
    const [spin, setSpin] = useState(false)
    const dispatch = useDispatch()

    const saveUserInfoAndNavigate = (userObj) => {
        if (!userObj) return
        setSpin(false)
        dispatch(setUserInfo(userObj))
        window.location.replace('/')
    }
    const errorLogger = ({ message }) => {
        setInfo({ type: 'error', message })
        setSpin(false)
    }
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
                    <FormButton btnText={"Login"} spin={spin} />
                </form>
                <section className='h-9 px-[31px] py-[9px] bg-white justify-center items-center gap-1 inline-flex text-base md:text-lg'>
                    New Account? <Link to='/register' className='text-blue-500 hover:underline'>Register</Link>
                </section>
            </div>
        </Transition>
    )
}

export default Login