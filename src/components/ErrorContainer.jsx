import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

const ErrorContainer = ({ errorMessage }) => {
    const [isOpen, setIsOpen] = useState(true)

    function closeErrorContainer() {
        setIsOpen(isOpen ? false : true)
    }
    return (
        errorMessage && isOpen ? (
            <div className="relative bg-white w-[70%] text-center border-[0.5px] p-1 border-red-200 rounded shadow h-[90px] flex justify-center items-center font-rale ">
                <FontAwesomeIcon icon={faTimes} className="absolute top-2 right-2 hover:bg-gray-200 rounded p-1 text-lg text-red-500  cursor-pointer" onClick={closeErrorContainer} />
                <section className=" text-red-500">{errorMessage}</section>
            </div>
        ) : null
    )
}

export default ErrorContainer