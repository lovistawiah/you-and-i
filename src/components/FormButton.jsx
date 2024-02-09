import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
const FormButton = ({ btnText, spin, isValid }) => {
    return (
        <button className={`w-[200px] h-[33px] px-3.5 py-[7px] font-roboto ${!isValid ? 'bg-red-500' : ' bg-blue-500'} rounded-[5px] border flex items-center justify-center text-white text-base font-normal${isValid ? 'bg-red-500' : 'hover:bg-blue-600'} ${!isValid ? 'bg-red-700' : ' active:bg-blue-700'} outline-none  md:w-[300px] md:text-lg disabled:cursor-not-allowed`} disabled={spin || !isValid}
        >
            {
                spin ? <><FontAwesomeIcon icon={faCircleNotch} className="animate-spin" /> <span className="pl-1">Processing...</span></> : <>{btnText}</>
            }
        </button>
    )
}

export default FormButton