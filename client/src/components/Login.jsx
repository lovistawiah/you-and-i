import { Link,  useNavigate } from 'react-router-dom'
import '../styles/login-signup.css'
import logoSVg from '../svg/logo.svg'
import { longiUser } from '../account/createUser'

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
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
            <form className='account-form' 
            onSubmit={async (e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                const obj = {
                    usernameEmail: formData.get('username-email'),
                    password: formData.get('password')
                }
                const { message, code } = await longiUser(obj)
                code == 200 ? navigate('/chats') : setErrorMessage(message)
            }}
            >
                <input type="text" name="username-email" className="login-form-input" id="" placeholder='Username or Email' />
                <input type="password" name="password" className="login-form-input" id="" placeholder='Password' />
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