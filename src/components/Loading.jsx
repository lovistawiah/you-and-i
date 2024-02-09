import Logo from '../../public/logo.png'
const Loading = () => {
    return (

        <section className={`w-screen h-screen flex justify-center items-center`}>
            <img
                src={Logo} alt="" className='animate-bounce' />
        </section>

    )
}

export default Loading