import { Link, useNavigate } from 'react-router-dom'
import logoSvg from '../svg/logo.svg'
import { useState } from 'react'
import { verifyUser } from '../account/User'
import '../styles/email.css'
import countDown from '../utils/countdown'

const VerifyEmail = () => {
  const navigate = useNavigate()
  const timer = countDown()
  const [errorMessage, setErrorMessage] = useState('')
  return (
    <section className="email-container">
      {
        errorMessage ? (
          <div className='request-message'>{errorMessage}</div>
        ) : null
      }
      <div className="skip-div">
        {/* add next page to here */}
        <Link to='/' className='skip-link'>Skip</Link>
      </div>
      <section className='logo-box'>
        <img src={logoSvg} alt="logo of you and I" />
      </section>
      <section className="name-email-message">
        <section className="company-name">You and I</section>
        <section className="email-message">Verify your email address</section>
      </section>
      <form className='form' onSubmit={async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        if (!localStorage.getItem('handleUserId')) {
          return setErrorMessage('user Id not found 😟, create new Account😃')
        }
        const formObj = {
          code: formData.get('code'),
          id: localStorage.getItem('handleUserId')
        }
        const { status, message } = await verifyUser(formObj)
        console.log(status, message)
        if (status == 200) {
          navigate('/login')
        } else {
          setErrorMessage(message)
        }
      }}>
        <input type="text" name="code" className='verify-input verify-code' />
        <button className='form-button'>Verify Email</button>
      </form>
      <section className='resend-box'>
        {
          timer == 0 ? (
            <Link className='resend-code'>Resend Code</Link>
          ) : (
            <p className='resend-code' style={{ textDecoration: 'none' }}>resend code in: {timer}: {timer ==1? 'sec':'secs'}</p>
          )
        }
      </section>
    </section>
  )
}
export default VerifyEmail