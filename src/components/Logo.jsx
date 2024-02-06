import LogoImg from '../../public/logo.png'

const Logo = () => {
    return (
        <section className="w-fit border-[0.4px] border-gray-300 p-1 rounded">
            <img src={LogoImg} alt="logo of you and I" className='w-[60px] h-[60px] md:w-[100px] md:h-[100px]' />
        </section>
    )
}

export default Logo