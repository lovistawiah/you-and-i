import {Link} from 'react-router-dom'
import '../styles/login-signup.css'
import logoSVg from '../svg/logo.svg'

const Login = () => {
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
                <input type="text" name="" className="form-input" id="" placeholder='Username or Email' />
                <input type="text" name="" className="form-input" id="" placeholder='Password' />
                <button className='form-button'>Login</button>
            </form>
            <Link className='forgot-password' to='/forgot-password'>Forgot Password</Link>
            <section className='have-account'>
                New Account? <Link to='/register' className='register-link'>Register</Link>
            </section>
        </div>
    )
}

export default Login