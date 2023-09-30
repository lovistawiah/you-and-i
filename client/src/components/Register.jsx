import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUser } from '../account/User'
import logoSVg from '../svg/logo.svg'
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
                <img src={logoSVg} alt="logo of you and I" />
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
                        firstName: formData.get('first-name'),
                        lastName: formData.get('last-name'),
                        email: formData.get('email'),
                        password: formData.get('password'),
                        confirmPassword: formData.get('confirm-password')
                    }
                    const { message, userId, status } = await createUser(formObj)
                    if (status == 200) {
                        localStorage.setItem('handleUserId', userId)
                        navigate('/verify')
                    } else {
                        setErrorMessage(message)
                    }
                }}
            >
                <input type="text" name="first-name" className="register-form-input" id="" placeholder='First Name' required />

                <input type="text" name="last-name" className="register-form-input" id="" placeholder='Last Name' required />

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