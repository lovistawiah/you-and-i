import { useRef, useState } from 'react'
import '../styles/message-panel.css'
import dpSvg from '../svg/dp.svg'
import SendSvg from './react-svg/SendSvg'
const MessagePanel = () => {
  const messagesBox = useRef(null)
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setMessage(e.target.value);

    // Calculate the textarea's scrollHeight based on its content
    const textarea = e.target;
    const textareaHeight = Math.min(80, Math.max(30, textarea.scrollHeight));

    // Calculate the bottom value for the message section
    const messageSectionBottom = `${textareaHeight + 20}px`;
    setMessageSectionBottom(messageSectionBottom);
    messagesBox.current.scrollTop = messagesBox.current.scrollHeight
  };

  const [messageSectionBottom, setMessageSectionBottom] = useState('55');
  function changeMessageHeight() {
    const root = document.getElementById('root')
    root.style.top = '240px'
    root.style.height = '68dvh'
    messagesBox.current.scrollTop = messagesBox.current.scrollHeight

  }

  function defaultMessageHeight() {
    console.log('here')
    const root = document.getElementById('root')
    root.style.top = '0px'
    root.style.height = '95dvh'
  }

  const elements = []
  for (let i = 0; i < 20; i++) {
    elements.push(<>

      <section className="message-holder">
        <section className="message-content-holder">
          hello Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, laboriosam in eaque rem libero consequatur ex, dolor doloribus quam odit alias praesentium facilis autem rerum eum enim possimus nobis sunt quidem veniam impedit quas eius! Harum explicabo quidem doloremque officia alias placeat. Ullam, magni saepe qui temporibus hic necessitatibus, modi vero quam natus officiis ipsam, dolorem explicabo debitis at cum recusandae blanditiis consectetur eaque expedita ipsum. Qui laboriosam velit ducimus debitis non voluptatem sint nisi, porro ratione aliquid veniam assumenda illum mollitia nihil neque, voluptates deserunt voluptate quam quia perspiciatis eligendi! Magnam, adipisci possimus quia quas a incidunt qui aspernatur rem. Quos excepturi laborum dolorum vel nam vero impedit consequuntur reprehenderit quod dignissimos libero fugit suscipit aut aperiam at deleniti molestiae ipsum illo harum, molestias voluptate perspiciatis hic cum? Totam quaerat illo eveniet corporis necessitatibus quis facere perferendis reiciendis laboriosam accusantium cupiditate veniam, nobis laborum, ab, non tempora blanditiis earum ducimus officia id saepe soluta maxime? Consequuntur exercitationem corporis repellendus voluptate tempora ipsum voluptas, at consequatur nostrum voluptatibus id quas fugit, numquam quibusdam obcaecati dicta sapiente sequi debitis. Qui sit magni hic at accusantium cupiditate pariatur amet provident rem laudantium quaerat recusandae harum et porro, eveniet odio quos, eum veniam ducimus doloribus sint. Culpa quis obcaecati sapiente quia voluptate a esse velit! Debitis, officia doloremque a, unde quis cumque blanditiis ratione nulla vitae saepe illum fugit itaque. Voluptatem vero laboriosam illum id officia rerum quos quia soluta repellat itaque natus fugiat ratione laborum, perferendis eos nihil, odio impedit debitis! Incidunt?
        </section>
        <section className="message-status">Delivered</section>
      </section>

      <section className="sender-holder">
        <section className="message-content-holder sender-content">
          hello Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam nam doloribus obcaecati aliquid mollitia nihil tempore dolore recusandae fuga odit, iure reiciendis distinctio, quasi eveniet delectus perspiciatis fugit! Repellat, fugiat!
        </section>
        <section className="message-status">Delivered</section>
      </section>
    </>)

  }
  return (
    <>
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

        <textarea onFocus={changeMessageHeight}
          onBlur={defaultMessageHeight}
          value={message}
          onChange={handleInputChange}
          onKeyUp={(e) => {
            e.target.style.height = '31px'
            let height = e.target.scrollHeight
            height += 1
            e.target.style.height = `${height}px`
          }}
          style={{ minHeight: '30px', maxHeight: '80px' }}
          className='message-input' >
        </textarea>

        <button className='send-button'>
          <SendSvg />
        </button>
      </form>
    </>
  )
}
export default MessagePanel