import {Link,useNavigate} from 'react-router-dom'
import '../styles/login-signup.css'
import logoSVg from '../svg/logo.svg'

const Login = () => {
    const navigate = useNavigate()
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
            <form className='account-form' onSubmit={()=> navigate('/')}>
                <input type="text" name="" className="login-form-input" id="" placeholder='Username or Email' />
                <input type="password" name="" className="login-form-input" id="" placeholder='Password' />
                <button className='login-form-button'>Login</button>
            </form>
            <Link className='forgot-password' to='/forgot-password'>Forgot Password</Link>
            <section className='register-account'>
                New Account? <Link to='/register' className='link'>Register</Link>
            </section>
        </div>
    )
}

export default Login