const WelcomeText = () => {
    return (
        <section className='w-[291px] h-[98px] mb-2 md:mb-6 py-2 flex-col justify-start items-center inline-flex'>
            <span className='text-black text-[32px] font-normal md:text-[48px] '>
                Welcome to,
            </span>
            <div className='w-[291px] h-[47px] px-[37px] justify-end items-center gap-[27px] inline-flex'>
                <span className='text-center text-blue-600 text-[32px] md:text-[48px] font-normal '> You and I </span>
            </div>
        </section>
    )
}

export default WelcomeText