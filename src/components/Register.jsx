import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUser } from '../account/User'
import Logo from "../../public/logo.png"
import InputForm from './InputForm'
import WelcomeText from './WelcomeText'
import FormButton from './FormButton'
const Register = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    return (
        <div className='w-screen h-screen py-[23px] px-[6px] flex flex-col items-center gap-4 justify-center'>
            {
                errorMessage ? (
                    <div className="text-red-500 border-[0.5px] p-1 border-red-300 rounded">{errorMessage}</div>
                ) : null
            }
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
                <FormButton btnText={"Create account"} />
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