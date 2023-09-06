import { Link } from 'react-router-dom'
import '../styles/login-signup.css'
import logoSVg from '../svg/logo.svg'
const Register = () => {
    return (
        <div className='container'>
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
            <form className='form'>
                <input type="text" name="" className="form-input" id="" placeholder='First Name' />
                <input type="text" name="" className="form-input" id="" placeholder='Last Name' />
                <input type="text" name="" className="form-input" id="" placeholder='Username' />
                <input type="text" name="" className="form-input" id="" placeholder='Password' />
                <input type="text" name="" className="form-input" id="" placeholder='Confirm Password' />
                <button className='form-button' 
                >Create Account
                </button>
            </form>
            <section className='account'>
                Have an Account?
                <Link to='/login' className='link'>
                    Login
                </Link>
            </section>
        </div>
    )
}
export default Register