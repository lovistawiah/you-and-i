import { Link, useNavigate } from 'react-router-dom'
import '../styles/login-signup.css'
import logoSVg from '../svg/logo.svg'
const Register = () => {
    const navigate = useNavigate()
    function submit() {
        navigate('/verify-email')
    }
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
            <form onSubmit={submit}
                className='account-form'>
                <input type="text" name="" className="register-form-input" id="" placeholder='First Name' />

                <input type="text" name="" className="register-form-input" id="" placeholder='Last Name' />

                <input type="text" name="" className="register-form-input" id="" placeholder='Email' />

                <input type="text" name="" className="register-form-input" id="" placeholder='Password' />

                <input type="text" name="" className="register-form-input" id="" placeholder='Confirm Password' />

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