const Messages = () => {
    return (
        <section className="messages">
            <p className='messages-date'>{messageHeaderDate(createdAt)}</p>
            <section className={`message ${sender != chatInfo?.userId ? 'sender' : ''}`} >
                <section className="message-content">{message}</section>
                <section className="message-status">{messageStatus(createdAt)}</section>
            </section>
        </section>
    )
}
export default Messages