import { Link } from 'react-router-dom'

const ForgotPassword = () => {
    return (
        <section className="forgot-password-container">
            <section className="logo-box">
                {/* <img src={logoSvg} alt="you and i logo" /> */}
            </section>
            <section className="welcome-message">
                You and I
            </section>
            <section className='reset-text'>
                Reset Password
            </section>
            <form className='reset-form'>
                <section className="password-boxes">
                    <input type="password" name="" id="" placeholder='New Password' />
                    <input type="password" name="" id="" placeholder='Confirm Password' />
                </section>
                <button className='reset-button'>Reset Password</button>
            </form>
            <section className="password">
                Remembered Password? <Link to='#'>Login</Link>
            </section>
        </section>
    )
}
export default ForgotPassword