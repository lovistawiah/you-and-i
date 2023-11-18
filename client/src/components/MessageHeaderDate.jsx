import { messageHeaderDate } from "../utils/compareDate";
const MessageHeaderDate = ({ messageDate }) => {
    const formattedDate = messageHeaderDate(messageDate)
    const existingDate = document.querySelector('p.messages-date')
console.log(existingDate)
    return <>
        {formattedDate && formattedDate !== existingDate && <p className="messages-date">{formattedDate}</p>}
    </>
};

export default MessageHeaderDate;
