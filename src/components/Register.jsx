import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setUserInfo } from "../app/userSlice"
import { signUp } from '../account/User'
import Logo from "../../public/logo.png"
import InputForm from './InputForm'
import WelcomeText from './WelcomeText'
import FormButton from './FormButton'
import InfoContainer from './InfoContainer'
const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [info, setInfo] = useState({})

    localStorage.removeItem('persist:root')
    const saveUserInfoAndNavigate = (userObj) => {
        if (!userObj) return
        dispatch(setUserInfo(userObj))
        navigate('/update-profile')
    }
    return (
        <>
            <InfoContainer info={info} setInfo={setInfo} />
            <div className='w-screen h-screen py-[23px] px-[6px] flex flex-col items-center gap-4 justify-center'>
                <section className="logo">
                    <img src={Logo} alt="logo of you and I" />
                </section>
                <WelcomeText />
                <form
                    className='flex flex-col items-center gap-[21px]'
                    onSubmit={async (e) => {
                        e.preventDefault()
                        const formData = new FormData(e.target)
                        const formObj = {
                            username: formData.get('username'),
                            email: formData.get('email'),
                            password: formData.get('password'),
                            confirmPassword: formData.get('confirm-password')
                        }
                        //? return userInfo or error message if status > 200
                        const result = await signUp(formObj)
                        result.status != 200 ? setInfo({ type: "error", message: result?.message }) : saveUserInfoAndNavigate(result.userInfo)
                    }}
                >
                    <InputForm type={"email"} name={"email"} placeholder={"Email"} id={""}
                    />
                    <InputForm type={"password"} name={"password"} placeholder={"Password"} id={""}
                    />
                    <InputForm type={"password"} name={"confirm-password"} placeholder={"confirm password"} id={""}
                    />
                    <FormButton btnText={"Create account"} />
                </form>
                <section className='h-9 px-[31px] py-[9px] bg-white justify-center items-center gap-1 inline-flex text-sm md:text-lg'>
                    Have an Account?
                    <Link to='/login' className='text-blue-700 hover:underline md:text-lg'>
                        Login
                    </Link>
                </section>
            </div>
        </>
    )
}
export default Register