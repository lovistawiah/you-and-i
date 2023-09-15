import { Link } from "react-router-dom"
const Home = () => {
    return (
        <div style={{display: 'flex',paddingTop: '20px'}}>
            <Link to='/register'>Register</Link>
            <Link to='/login'>Login</Link>
            <Link to='/forgot-password'>Forgot password</Link>
            <Link to='/chat-panel'>Chat Panel</Link>
            <Link to='/message-panel'>Message Panel</Link>
            <Link to='/verify-email'>Verify Email</Link>
        </div>
    )
}
export default Home