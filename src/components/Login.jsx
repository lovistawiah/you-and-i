import { useState } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../account/User'
import Logo from '../../public/logo.png'
import WelcomeText from './WelcomeText'
import InputForm from './InputForm'
import FormButton from './FormButton'
import InfoContainer from './InfoContainer'

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('')
    return (
        <div className='w-screen h-screen py-[23px] px-[6px] flex flex-col items-center gap-4 justify-center'>
            <InfoContainer errorMessage={errorMessage} />
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
                    const result = await login(obj)
                    result?.status != 200 ? setErrorMessage(result?.message) : window.location.replace('/')
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
            {/* <Link className='text-blue-500 hover:underline md:text-lg' to='/forgot-password'>Forgot Password</Link> */}
            <section className='h-9 px-[31px] py-[9px] bg-white justify-center items-center gap-1 inline-flex text-sm md:text-lg'>
                New Account? <Link to='/register' className='text-blue-500 hover:underline'>Register</Link>
            </section>
        </div>
    )
}

export default Login