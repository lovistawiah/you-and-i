import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUser } from '../account/User'
import Logo from "../../public/logo.png"
import InputForm from './InputForm'
const Register = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    return (
        <div className='w-screen py-[23px] px-[6px] flex flex-col items-center gap-4 justify-center'>
            {
                errorMessage ? (
                    <div className="request-message">{errorMessage}</div>
                ) : null
            }
            <section className="logo">
                <img src={Logo} alt="logo of you and I" />
            </section>
            {/* welcome text */}
            <section className='w-[291px] h-[98px] py-2 bg-white flex-col justify-start items-center inline-flex'>
                <span className='text-black text-[32px] font-normal '>
                    Welcome to,
                </span>
                <div className='w-[291px] h-[47px] px-[37px] justify-end items-center gap-[27px] inline-flex'>
                    <span className='text-center text-blue-600 text-[32px] font-normal '> You and I </span>
                </div>
            </section>
            {/* end of welcome of text */}
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
                    const result = await createUser(formObj)
                    const status = result?.status
                    status != 200 ? setErrorMessage(result?.message) : navigate('/login')
                }}
            >
                <InputForm type={"email"} name={"email"} placeholder={"Email"} id={""}
                />
                <InputForm type={"password"} name={"password"} placeholder={"Password"} id={""}
                />
                <InputForm type={"password"} name={"confirm-password"} placeholder={"confirm password"} id={""}
                />
                <button className='w-[280px] h-[33px] px-3.5 py-[7px] bg-blue-600 rounded-[5px] border border-neutral-500 flex items-center justify-center text-white text-base font-normal hover:bg-blue-700 active:bg-blue-800 '
                >Create Account
                </button>
            </form>
            <section className=' h-9 px-[31px] py-[9px] bg-white justify-center items-center gap-1 inline-flex text-sm'>
                Have an Account?
                <Link to='/login' className='text-blue-700 hover:underline '>
                    Login
                </Link>
            </section>
        </div>
    )
}
export default Register