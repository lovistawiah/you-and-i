import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"


const InputForm = ({ type, name, placeholder, id }) => {
    const [showPass, setShowPass] = useState(false)
    const passVisibility = () => {
        setShowPass(!showPass)
    }
    return (
        <div className="flex flex-col w-fit">
            <label htmlFor={id} className="text-gray-800 font-rale font-medium text-base">
                {placeholder}
            </label>
            <div className="relative">
                <input type={
                    showPass && type.includes('password') ? 'text'
                        : type.includes('password') && !showPass ? 'password' :
                            'text'
                } name={name} className="w-[275px] h-[36px] py-[1px] pr-0 pl-[4px] rounded-[5px] bg-white border border-gray-500 text-base font-normal placeholder:text-gray-400 text-gray-800 outline-none md:w-[350px]  md:text-lg focus:border-blue-400 focus:border-[2px] font-rale" id={id} placeholder={placeholder} required />
                {
                    type.includes('password') ? <FontAwesomeIcon icon={showPass && type.includes('password') ? faEyeSlash : faEye} className="absolute top-[10px] right-2 text-gray-600" onClick={passVisibility} /> : null
                }
            </div>
        </div>
    )
}

export default InputForm