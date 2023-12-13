// import { useEffect, useState } from "react"
import { messageHeaderDate, messageStatus } from "../utils/compareDate"

const Message = ({ message, sender, createdAt, userId }) => {
    const formattedMessageHeaderDate = messageHeaderDate(createdAt)
    const messageStatusText = messageStatus(createdAt)

    return (
        <>
            <p className="messages-date">{formattedMessageHeaderDate}</p>
            <section className={`message ${sender != userId ? 'sender' : ''}`} >
                <section className="message-content">{message}</section>
                <section className="message-status">{messageStatusText}</section>
            </section>
        </>

    )
}

export default Message