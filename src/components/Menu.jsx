import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faGear, faUserPlus } from '@fortawesome/free-solid-svg-icons'

const Menu = ({ pageSelector, windowWidth, userAvatar }) => {

    const icons = [
        { iconText: "Settings", iconName: faGear },
        { iconText: "Contacts", iconName: faUserPlus },
        { iconText: "Chats", iconName: faComments },
    ]

    return (
        <div className="w-full border-t border-stone-400 justify-around pt-2 flex fixed bottom-0 md:bottom-[unset] md:flex-col md:w-[90px] md:h-screen md:justify-start md:relative order-1 md:border-r md:border-gray-200 bg-gray-50 z-30">
            {
                icons.map(({ iconName, iconText }, i) => (
                    // added one to id to make number more understandable
                    <button className={`flex p-1 flex-col text-zinc-600 font-rale font-normal md:justify-center md:my-2 md:items-center ${iconText === "Chats" ? 'md:order-1' : iconText === 'Contacts' ? 'md:order-2' : 'md:order-3'} text-base focus:text-blue-500`} key={i} onClick={pageSelector} id={i + 1}>
                        <FontAwesomeIcon icon={iconName} className='pointer-events-none self-center' />
                        {iconText}
                    </button>
                ))
            }
            {
                windowWidth > 768 && <section className="w-[32px] h-[32px] self-center justify-center items-center flex shrink-0 order-4 mt-auto my-2 ">
                    <img src={userAvatar} alt="user dp" className='rounded-full' />
                </section>
            }
        </div>
    )
}

export default Menu