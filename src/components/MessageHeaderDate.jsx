import { messageHeaderDate } from "../utils/compareDate";
const MessageHeaderDate = ({ messageDate }) => {
    const formattedDate = messageHeaderDate(messageDate)
    return <>
        <section className="w-min h-auto p-1 bg-white rounded-full border border-stone-100  items-center flex self-center text-center text-black text-[12px] font-normal my-1">{formattedDate}</section>

    </>
};

export default MessageHeaderDate;
