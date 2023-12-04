import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUser } from '../account/User'
// import logoSVg from '../svg/logo.svg'
import '../styles/login-signup.css'
const Register = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    return (
        <div className='account-container'>
            {
                errorMessage ? (
                    <div className="request-message">{errorMessage}</div>
                ) : null
            }
            <section className="logo">
                {/* <img src={logoSVg} alt="logo of you and I" /> */}
            </section>
            <section className='welcome-message'>
                <span className='first-message'>
                    Welcome to,
                </span>
                <div className='second-message-box'>
                    <span> You and I </span>
                </div>
            </section>
            <form
                className='account-form'
                onSubmit={async (e) => {
                    e.preventDefault()
                    const formData = new FormData(e.target)
                    const formObj = {
                        email: formData.get('email'),
                        password: formData.get('password'),
                        confirmPassword: formData.get('confirm-password')
                    }
                    const result = await createUser(formObj)
                    const status = result?.status
                    console.log(status)
                    status != 200 ? setErrorMessage(result?.message): navigate('/login')
                }}
            >
                <input type="email" name="email" className="register-form-input" id="" placeholder='Email' required />

                <input type="password" name="password" className="register-form-input" id="" placeholder='Password' required />

                <input type="password" name="confirm-password" className="register-form-input" id="" placeholder='Confirm Password' required />

                <button className='register-form-button'
                >Create Account
                </button>
            </form>
            <section className='have-account'>
                Have an Account?
                <Link to='/login' className='link'>
                    Login
                </Link>
            </section>
        </div>
    )
}
export default Register