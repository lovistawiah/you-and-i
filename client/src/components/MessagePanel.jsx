import { useEffect, useRef, useState } from 'react'
import '../styles/message-panel.css'
import dpSvg from '../svg/dp.svg'
import SendSvg from './react-svg/SendSvg'
const MessagePanel = () => {
  const [containerHeight, setContainerHeight] = useState(visualViewport.height)

  const [messageSectionBottom, setMessageSectionBottom] = useState('55');
  const messagesBox = useRef(null)
  const [message, setMessage] = useState('');
  function scrollToBottom () {
    messagesBox.current.scrollTop = messagesBox.current.scrollHeight
  }
  const handleInputChange = (e) => {
    setMessage(e.target.value);
    const textarea = e.target;
    const textareaHeight = Math.min(80, Math.max(30, textarea.scrollHeight));

    const messageSectionBottom = `${textareaHeight + 40}px`;
    setMessageSectionBottom(messageSectionBottom);
    messagesBox.current.scrollTop = messagesBox.current.scrollHeight

    messagesBox.current.scrollTop = messagesBox.current.scrollHeight
  };
  function controlContainerHeight() {
    setContainerHeight(visualViewport.height)
  }
  useEffect(() => {
    visualViewport.addEventListener('resize', controlContainerHeight)
    return () => {
      visualViewport.removeEventListener('resize', controlContainerHeight)
    }
  }, [])

  const elements = []
  for (let i = 0; i < 20; i++) {
    elements.push(<>

      <section className="message-holder">
        <section className="message-content-holder">
          hello Lorem ipsum dolor sit,
        </section>
        <section className="message-status">Delivered</section>
      </section>

      <section className="sender-holder">
        <section className="message-content-holder sender-content">
          Lorem ipsum dolor, sit amet 
        </section>
        <section className="message-status">Delivered</section>
      </section>
    </>)

  }
  return (
    <section className='message-container'
      style={{ height: `${containerHeight}px` }}>
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
      <section
        className="messages"
        style={{ bottom: messageSectionBottom }}
        ref={messagesBox}
      >

        <section className="date">
          <section className="message-date">12/03/2023</section>
        </section>
        {elements}
      </section>
      <form className="send-message">

        <textarea
          value={message}
          onChange={handleInputChange}
          onKeyUp={(e) => {
            e.target.style.height = '31px'
            let height = e.target.scrollHeight
            height += 1
            e.target.style.height = `${height}px`
          }}
          style={{ minHeight: '30px', maxHeight: '80px' }}
          onFocus={scrollToBottom}
          className='message-input' >
        </textarea>

        <button className='send-button'>
          <SendSvg />
        </button>
      </form>
    </section>
  )
}
export default MessagePanel