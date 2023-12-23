import Message from "./Message";
const Messages = ({ messages, userId, messageMarginBtm }) => {
    return (
        <section className="lex-col flex w-full overflow-y-auto mt-[50px]  row-span-5 flex-col" style={{ marginBottom: `${messageMarginBtm}px` }}>
            {
                messages?.map(({ _id, message, sender, createdAt }) => (

                    <Message
                        key={_id}
                        message={message}
                        sender={sender}
                        createdAt={createdAt}
                        userId={userId}
                    />
                ))
            }
        </section>
    );
};

export default Messages;
