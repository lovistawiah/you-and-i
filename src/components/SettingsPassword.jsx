import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

const SettingsPassword = ({ label, placeholder, name }) => {
    const [showPass, setShowPass] = useState(false)

    const passVisibility = () => {
        setShowPass(!showPass)
    }
    return (
        <div className="flex flex-col w-fit">
            <label htmlFor='password' className="text-gray-800 font-roboto font-normal text-base">
                {label}
            </label>
            <div className="relative">
                <input type={showPass ? 'text' : 'password'
                } name={name} className='h-[36px] py-[1px] pr-0 pl-[4px] bg-white border rounded border-gray-500 text-base font-normal font-roboto text-neutral-700 active:border-zinc-800 outline-none min-w-[270px] max-w-[320px] focus:border-[2px] focus:border-blue-400 ' id='password' placeholder={placeholder} required />
                {
                    <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} className="absolute top-[10px] right-2 text-gray-600" onClick={passVisibility} />

                }
            </div>
        </div>
    )
}

export default SettingsPassword