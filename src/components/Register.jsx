import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setUserInfo } from "../app/userSlice"
import { signUp } from '../account/User'
import InputForm from './InputForm'
import WelcomeText from './WelcomeText'
import FormButton from './FormButton'
import InfoContainer from './InfoContainer'
import Transition from './Transition'
import Logo from './Logo'
import ConfirmPassInput from './ConfirmPass'
import PasswordInput from './PasswordInput'
const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [info, setInfo] = useState({})
    const [spin, setSpin] = useState(false)
    const [isValid, setIsValid] = useState(true)

    const saveUserInfoAndNavigate = (userObj) => {
        if (!userObj) return
        setSpin(false)
        dispatch(setUserInfo(userObj))
        navigate('/update-profile')
    }
    const errorLogger = ({ message }) => {
        setInfo({ type: 'error', message })
        setSpin(false)
    }
    useEffect(() => {
        if (!isValid) {
            setInfo({
                type: 'error',
                message: `<ul>
                <li>Password should:</li>
                  <li>At least 8 characters long</li>
                  <li>Contains at least one uppercase letter</li>
                  <li>Contains at least one lowercase letter</li>
                  <li>Contains at least one digit</li>
                  <li>Contains at least one special character (such as !@#$%^&*())</li>
                  </ul>`
            })
        } else {
            setInfo({})
        }
    }, [isValid])
    return (
        <Transition>
            <InfoContainer info={info} setInfo={setInfo} />
            <div className='w-screen h-screen py-[20px] px-[6px] flex flex-col items-center gap-1 justify-center'>
                <Logo />
                <WelcomeText />
                <form
                    className='flex flex-col items-center gap-[21px]'
                    onSubmit={async (e) => {
                        e.preventDefault()
                        setSpin(true)
                        const formData = new FormData(e.target)
                        const formObj = {
                            username: formData.get('username'),
                            email: formData.get('email'),
                            password: formData.get('password'),
                            confirmPassword: formData.get('confirm-password')
                        }
                        //? return userInfo or error message if status > 200
                        const result = await signUp(formObj)
                        result.status != 200 ? errorLogger({ message: result?.message }) : saveUserInfoAndNavigate(result.userInfo)
                    }}
                >
                    <InputForm type={"email"} name={"email"} placeholder={"Email"} id={"email"}
                    />
                    <PasswordInput isValid={isValid} setIsValid={setIsValid} key={'password'} />
                    <ConfirmPassInput />
                    <FormButton btnText={"Create account"} isValid={isValid} spin={spin} />
                </form>
                <section className='h-9 px-[31px] py-[9px] bg-white justify-center items-center gap-1 inline-flex text-base md:text-lg'>
                    Have an Account?
                    <Link to='/login' className='text-blue-600 hover:underline md:text-lg'>
                        Login
                    </Link>
                </section>
            </div>
        </Transition>
    )
}
export default Register