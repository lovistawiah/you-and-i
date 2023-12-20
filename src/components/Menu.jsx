import { faComments, faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Menu = () => {
    return (
        <div className="w-full bg-white border-t border-stone-400 justify-around pt-2 flex absolute bottom-3">
            <section className="flex flex-col text-zinc-600 font-rale font-medium">
                <FontAwesomeIcon icon={faGear} />
                Settings
            </section>
            <section className='flex flex-col text-zinc-600 font-rale font-medium'>
                <FontAwesomeIcon icon={faComments} />
                Chats
            </section>

        </div>
    )
}

export default Menu