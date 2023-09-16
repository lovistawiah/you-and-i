import { Link } from 'react-router-dom'
import createUser from '../account/createUser'
import '../styles/login-signup.css'
import logoSVg from '../svg/logo.svg'
const Register = () => {
    return (
        <div className='account-container'>
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
            <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                const formObj = {
                    firstName: formData.get('first-name') ?? "",
                    lastName: formData.get('last-name') ?? "",
                    email: formData.get('email') ?? "",
                    password: formData.get('password') ?? "",
                    confirmPassword: formData.get('confirm-password') ?? ""
                }
                createUser(formObj)

            }}
                className='account-form'>
                <input type="text" name="first-name" className="register-form-input" id="" placeholder='First Name' />

                <input type="text" name="last-name" className="register-form-input" id="" placeholder='Last Name' />

                <input type="email" name="email" className="register-form-input" id="" placeholder='Email' />

                <input type="password" name="password" className="register-form-input" id="" placeholder='Password' />

                <input type="password" name="confirm-password" className="register-form-input" id="" placeholder='Confirm Password' />

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