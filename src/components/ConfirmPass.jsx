import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef, useState } from "react"


const ConfirmPassInput = () => {
    const [showPass, setShowPass] = useState(false)
    const passwordRef = useRef(null)
    const passVisibility = () => {
        setShowPass(!showPass)
    }
    return (
        <div className="flex flex-col w-fit">
            <label htmlFor='confirm-password' className="text-gray-800 font-rale font-medium text-base">
                Confirm Password
            </label>
            <div className="relative">
                <input ref={passwordRef} type={showPass ? 'text' : 'password'} name='confirm-password' className="w-[275px] h-[36px] py-[1px] pr-0 pl-[4px] rounded-[5px] bg-white border border-gray-500 text-base font-normal placeholder:text-gray-400 text-gray-800 outline-none md:w-[350px]  md:text-lg focus:border-blue-400 focus:border-[2px] font-rale" id='confirm-password' placeholder='Confirm Password' required />
                {
                    <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} className="absolute top-[10px] right-2 text-gray-600" onClick={passVisibility} />
                }
            </div>
        </div>
    )
}

export default ConfirmPassInput