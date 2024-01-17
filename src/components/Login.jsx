import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../account/User'
import Logo from '../../public/logo.png'
import WelcomeText from './WelcomeText'
import InputForm from './InputForm'
import FormButton from './FormButton'

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
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
            <form className='flex flex-col items-center gap-[21px]'
                onSubmit={async (e) => {
                    e.preventDefault()
                    const formData = new FormData(e.target)
                    const obj = {
                        usernameEmail: formData.get('username-email'),
                        password: formData.get('password')
                    }
                    const result = await loginUser(obj)
                    result?.status != 200 ? setErrorMessage(result?.message) : navigate('/')

                }}
            >
                <InputForm
                    name={"username-email"}
                    type={"text"}
                    placeholder={"enter username or email"}
                    id={""}
                />
                <InputForm
                    name={"password"}
                    placeholder={"password"}
                    id={""}
                    type={"password"}
                />
                <FormButton btnText={"Login"} />
            </form>
            <Link className='text-blue-500 hover:underline' to='/forgot-password'>Forgot Password</Link>
            <section className='register-account'>
                New Account? <Link to='/register' className='text-blue-500 hover:underline'>Register</Link>
            </section>
        </div>
    )
}

export default Login