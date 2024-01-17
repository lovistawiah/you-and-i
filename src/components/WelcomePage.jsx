import { Link } from "react-router-dom"
import Logo from '../images/you-and-i-logo.png'
const WelcomePage = () => {
    return (
        <section className='flex items-center justify-center w-screen h-screen bg-gray-50'>
            {/* modal */}
            <section className='w-[300px] h-[250px] bg-gray-200 shadow-sm rounded items-center  flex flex-col justify-center'>

                <img src={Logo} alt="logo" className='w-[60px] h-[60px] ' />
                <h2 className='font-bold pt-3 font-rale text-2xl'>Welcome back,</h2>
                <section className=" flex justify-evenly w-full pt-5">
                    <Link to="/register" className='w-fit h-[33px] px-3.5 py-[7px] bg-blue-600 rounded-[5px] border border-neutral-500 flex items-center justify-center text-white text-base font-normal hover:bg-blue-700 active:bg-blue-800 outline-none'>Register</Link>
                    <Link to="/login" className='w-fit h-[33px] px-3.5 py-[7px] bg-blue-600 rounded-[5px] border border-neutral-500 flex items-center justify-center text-white text-base font-normal hover:bg-blue-700 active:bg-blue-800 outline-none'>Login</Link>
                </section>
            </section>
        </section>
    )
}

export default WelcomePage