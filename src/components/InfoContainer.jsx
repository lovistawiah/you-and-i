import { useState } from "react"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion, AnimatePresence } from 'framer-motion'

const InfoContainer = ({ info, setInfo }) => {
    const [isOpen, setIsOpen] = useState(false)

    function closeErrorContainer() {
        setIsOpen(isOpen ? true : false)
        setInfo({})
    }
    return (
        <AnimatePresence>
            {
                info?.message ? (
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0.8 }}
                        className={`absolute bg-white w-[320px] md:w-[450px] left-0 right-0 top-2 m-auto text-center border-[0.5px] p-1 ${info?.type === "error" ? ' border-red-200' : ' border-blue-200'} rounded shadow h-fit flex justify-center items-center font-rale z-20`} >

                        <p> <FontAwesomeIcon icon={faTimes} className={`absolute top-1 right-2 hover:bg-gray-200 rounded p-1 text-lg ${info?.type === "error" ? ' text-red-500' : ' text-blue-500'}  cursor-pointer`} onClick={closeErrorContainer} /></p>

                        <section className={`${info?.type === "error" ? 'text-red-500' : 'text-blue-500'} mt-5`} >{info.message}</section>
                    </motion.div>
                ) : null

            }
        </AnimatePresence>
    )
}

export default InfoContainer