import { Link } from "react-router-dom"
const Home = () => {
    return (
        <div style={{display: 'flex',paddingTop: '20px'}}>
            <Link to='/register'>Register</Link>
            <Link to='/login'>Login</Link>
            <Link to='/forgot-password'>Forgot password</Link>
            <Link to='/chats'>Chat Panel</Link>
            <Link to='/messages'>Message Panel</Link>
            <Link to='/verify'>Verify Email</Link>
            <Link to='/new-friends'></Link>
        </div>
    )
}
export default Home