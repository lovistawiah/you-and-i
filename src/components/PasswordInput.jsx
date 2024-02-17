import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"


const PasswordInput = ({ setIsValid, isValid, label }) => {
    const [showPass, setShowPass] = useState(false)

    const passVisibility = () => {
        setShowPass(!showPass)
    }

    const onBlur = (e) => {
        const passText = e.target.value
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,+><_])[A-Za-z\d@$!%*?&,+><_]{8,}$/
        setIsValid(passRegex.test(passText))
    }

    return (
        <div className="flex flex-col w-fit">
            <label htmlFor='password' className="text-gray-800 font-roboto font-normal text-base">
                {label}
            </label>
            <div className="relative">
                <input type={showPass ? 'text' : 'password'
                } name='password' className={`w-[275px] h-[36px] py-[1px] pr-0 pl-[4px] rounded-[5px] bg-white border ${!isValid ? 'border-red-500' : ' border-gray-500'} text-base font-normal placeholder:text-gray-400 text-gray-800 outline-none md:w-[350px]  md:text-lg focus:border-[2px] font-roboto focus:border-blue-400`} id='password' placeholder='Password' onBlur={onBlur} required />
                {
                    <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} className="absolute top-[10px] right-2 text-gray-600" onClick={passVisibility} />
                }
            </div>
        </div>
    )
}

export default PasswordInput