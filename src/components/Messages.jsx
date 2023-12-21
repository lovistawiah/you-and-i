import Message from "./Message";
const Messages = ({ messages, userId }) => {
    return (
        <section className="mt-[51px]">
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
