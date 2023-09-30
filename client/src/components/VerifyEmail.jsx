import { Link, Navigate, useNavigate } from 'react-router-dom'
import UserContext from '../utils/UserContext'
import logoSvg from '../svg/logo.svg'

import '../styles/email.css'
import { useContext, useState } from 'react'
import { verifyUser } from '../account/User'
const VerifyEmail = () => {
  const navigate = useNavigate()
  const [userId] = useContext(UserContext)
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
      <form className='form' onSubmit={async(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const formObj = {
          code: formData.get('code'),
          id: userId
        }
        const { status, message } = await verifyUser(formObj)
        console.log(status, message)
        if (status == 200) {
          navigate('/login')
        } else {
          setErrorMessage(message)
        }
      }}>
        <input type="text" name="code" id="" placeholder='' className='verify-input verify-code' />
        <button className='form-button'>Verify Email</button>
      </form>
      <section className='resend-box'>
        <Link className='resend-code'>Resend Code</Link>
      </section>
    </section>
  )
}
export default VerifyEmail