
import Logo from '../../public/logo.png'
import LinkText from './LinkText'
const WelcomePage = ({ message }) => {
    return (
        <section className='flex items-center justify-center w-screen h-screen bg-gray-50'>
            <section className='w-[300px] h-[250px] bg-gray-200 shadow-sm rounded items-center  flex flex-col justify-center md:w-[500px] md:h-[300px] '>
                <img src={Logo} alt="logo" className='w-[60px] h-[60px] md:w-[100px] md:h-[100px] ' />
                <h2 className='font-bold pt-3 font-rale text-3xl'>Welcome back,</h2>
                <p className='text-red-500'>{message}</p>
                <section className=" flex justify-evenly w-full pt-5">
                    <LinkText linkName={"Register"} />
                    <LinkText linkName={"Login"} />
                </section>
            </section>
        </section>
    )
}

export default WelcomePage