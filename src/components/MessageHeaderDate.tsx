const MessageHeaderDate = ({ messageDate }) => {
  return (
    <>
      <section className="my-1 flex  h-auto items-center self-center rounded-full  border border-stone-100 bg-white p-1 text-center text-[12px] font-normal text-black">
        {messageDate}
      </section>
    </>
  );
};

export default MessageHeaderDate;
