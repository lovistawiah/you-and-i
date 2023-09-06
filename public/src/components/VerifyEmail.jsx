import { Link } from 'react-router-dom'
import logoSvg from '../svg/logo.svg'

import '../styles/add-email.css'
const VerifyEmail = () => {
  return (
    <section className="container">
      <div className="skip-div">
        {/* add next page to here */}
        <Link className='skip-link'>Skip</Link>
      </div>
      <section className='logo-box'>
        <img src={logoSvg} alt="logo of you and I" />
      </section>
      <section className="name-email-message">
        <section className="company-name">You and I</section>
        <section className="email-message">Verify your email address</section>
      </section>
      <form className='form'>
        <input type="text" name="" id="" placeholder='' className='verify-input verify-code' />
        <button className='form-button'>Verify Email</button>
      </form>
      <section className='resend-box'>
        <Link className='resend-code'>Resend Code</Link>
      </section>
    </section>
  )
}
export default VerifyEmail