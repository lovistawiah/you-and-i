// import { Helmet } from 'react-helmet'
import { useEffect, useRef, useState } from 'react'
import '../styles/message-panel.css'
import dpSvg from '../svg/dp.svg'
import sendSvg from '../svg/send-button.svg'
const MessagePanel = () => {
  const [textAreaHeight, getTextAreaHeight] = useState()
  const messagesContainer = useRef(null)
  const textArea = useRef(null)
  //scroll to the bottom when page opens
  useEffect(() => {
    if (messagesContainer.current) {
      messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight
    }
  }, [])
  //when textarea changes scroll to
  useEffect(() => {
    if (messagesContainer.current) {
      messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight
    }
    // change it later to when textArea is focused and new messages is append
    // create a position button on the messages to scroll to the bottom
  }, [textAreaHeight])

  return (
    <div className='message-container'>
      <section className="user">
        <section className="dp-name-status">
          <section className="dp-holder">
            <img src={dpSvg} alt="dp of user" className='dp' />
          </section>
          <section className="username-status">
            <section className="username">Lovis Tawiah</section>
            <section className="status">online</section>
          </section>
        </section>
      </section>
      <section className="messages" ref={messagesContainer}>

        <section className="date">
          <section className="message-date">12/03/2023</section>
        </section>

        <section className="message-holder">
          <section className="message-content-holder">
            hello, it is me and I’m typing and it is working as expected and what do you think
          </section>
          <section className="message-status">Delivered</section>
        </section>
        <section className="message-holder">
          <section className="message-content-holder">
            hello, it is me and I’m typing and it is working as expected and what do you think
          </section>
          <section className="message-status">Delivered</section>
        </section>
        <section className="message-holder">
          <section className="message-content-holder">
            hello, it is me and I’m typing and it is working as expected and what do you think
          </section>
          <section className="message-status">Delivered</section>
        </section>
        <section className="message-holder">
          <section className="message-content-holder">
            hello, it is me and I’m typing and it is working as expected and what do you think
          </section>
          <section className="message-status">Delivered</section>
        </section>
        <section className="message-holder">
          <section className="message-content-holder">
            hello, it is me and I’m typing and it is working as expected and what do you think
          </section>
          <section className="message-status">Delivered</section>
        </section>
        <section className="message-holder">
          <section className="message-content-holder">
            hello, it is me and I’m typing and it is working as expected and what do you think
          </section>
          <section className="message-status">Delivered</section>
        </section>
        <section className="message-holder">
          <section className="message-content-holder">
            hello, it is me and I’m typing and it is working as expected and what do you think
          </section>
          <section className="message-status">Delivered</section>
        </section>
        <section className="message-holder">
          <section className="message-content-holder">
            hello, it is me and I’m typing and it is working as expected and what do you think
          </section>
          <section className="message-status">Delivered</section>
        </section>
        <section className="message-holder">
          <section className="message-content-holder">
            hello, it is me and I’m typing and it is working as expected and what do you think
          </section>
          <section className="message-status">Delivered</section>
        </section>
        <section className="message-holder">
          <section className="message-content-holder">
            hello, it is me and I’m typing and it is working as expected and what do you think
          </section>
          <section className="message-status">Delivered</section>
        </section>
        <section className="message-holder">
          <section className="message-content-holder">
            hello, it is me and I’m typing and it is working as expected and what do you think
          </section>
          <section className="message-status">Delivered</section>
        </section>
        <section className="message-holder">
          <section className="message-content-holder">
            hello, it is me and I’m typing and it is working as expected and what do you think
          </section>
          <section className="message-status">Delivered</section>
        </section>
        <section className="message-holder">
          <section className="message-content-holder">
            hello, it is me and I’m typing and it is working as expected and what do you think
          </section>
          <section className="message-status">Delivered</section>
        </section>
        <section className="message-holder">
          <section className="message-content-holder">
            hello, it is me and I’m typing and it is working as expected and what do you think
          </section>
          <section className="message-status">Delivered</section>
        </section>
        <section className="message-holder">
          <section className="message-content-holder">
            hello, it is me and I’m typing and it is working as expected and what do you think
          </section>
          <section className="message-status">Delivered</section>
        </section>
        <section className="message-holder">
          <section className="message-content-holder">
            hello, it is me and I’m typing and it is working as expected and what do you think
          </section>
          <section className="message-status">Delivered</section>
        </section>
        <section className="message-holder">
          <section className="message-content-holder">
            hello, it is me and I’m typing and it is working as expected and what do you think
          </section>
          <section className="message-status">Delivered</section>
        </section>
        <section className="message-holder">
          <section className="message-content-holder">
            hello, it is me and I’m typing and it is working as expected and what do you think
          </section>
          <section className="message-status">Delivered</section>
        </section>
        <section className="message-holder">
          <section className="message-content-holder">
            hello, it is me and I’m typing and it is working as expected and what do you think
          </section>
          <section className="message-status">Delivered</section>
        </section>
        <section className="message-holder">
          <section className="message-content-holder">
            hello, it is me and I’m typing and it is working as expected and what do you think
          </section>
          <section className="message-status">Delivered</section>
        </section>
        <section className="message-holder">
          <section className="message-content-holder">
            hello, it is me and I’m typing and it is working as expected and what do you think
          </section>
          <section className="message-status">Delivered</section>
        </section>
        <section className="message-holder">
          <section className="message-content-holder">
            hello, it is me and I’m typing and it is working as expected and what do you think
          </section>
          <section className="message-status">Delivered</section>
        </section>
        <section className="message-holder">
          <section className="message-content-holder">
            hello, it is me and I’m typing and it is working as expected and what do you think
          </section>
          <section className="message-status">Delivered</section>
        </section>
        <section className="message-holder">
          <section className="message-content-holder">
            hello, it is me and I’m typing and it is working as expected and what do you think
          </section>
          <section className="message-status">Delivered</section>
        </section>
        <section className="message-holder">
          <section className="message-content-holder">
            hello, it is me and I’m typing and it is working as expected and what do you think
          </section>
          <section className="message-status">Delivered</section>
        </section>
        <section className="message-holder">
          <section className="message-content-holder">
            hello, it is me and I’m typing and it is working as expected and what do you think
          </section>
          <section className="message-status">Delivered</section>
        </section>
        <section className="message-holder">
          <section className="message-content-holder">
            hello, it is me and I’m typing and it is working as expected and what do you think
          </section>
          <section className="message-status">Delivered</section>
        </section>
        <section className="message-holder">
          <section className="message-content-holder">
            hello, it is me and I’m typing and it is working as expected and what do you think
          </section>
          <section className="message-status">Delivered</section>
        </section>
        <section className="message-holder">
          <section className="message-content-holder">
            hello, it is me and I’m typing and it is working as expected and what do you think
          </section>
          <section className="message-status">Delivered</section>
        </section>
        <section className="message-holder">
          <section className="message-content-holder">
            hello, it is me and I’m typing and it is working as expected and what do you think
          </section>
          <section className="message-status">Delivered</section>
        </section>

        <section className="message-holder sender">
          <section className="message-content-holder sender-content">
            hello, it is me and I’m typing and it is working as expected and what do you think
          </section>
          <section className="message-status">Delivered</section>
        </section>

        <section className="message-holder sender">
          <section className="message-content-holder sender-content">
            hello, it is me and I’m typing and it is working as expected and what do you think
          </section>
          <section className="message-status">Delivered</section>
        </section>


      </section>
      <form className="send-message"
      >
        <textarea ref={textArea}
          onKeyUp={(e) => {
            e.target.style.height = '25px'
            let height = e.target.scrollHeight
            height += 1
            getTextAreaHeight(height)
            e.target.style.height = `${height}px`
          }}
          className='message-input' placeholder='enter message here...'></textarea>
        <button className='send-button'>
          <img src={sendSvg} alt="" className='send-svg' />
        </button>

      </form>
    </div>
  )
}
export default MessagePanel