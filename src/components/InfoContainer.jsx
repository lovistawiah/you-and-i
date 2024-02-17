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
                        exit={{ opacity: 1 }}

                        className={`absolute bg-white w-[300px] md:w-[450px] left-0 right-0 top-7 m-auto text-center border-[0.5px] p-1 ${info?.type === "error" ? ' border-red-100' : ' border-blue-100'} rounded shadow h-fit flex justify-start items-center font-roboto z-20 text-sm`} >

                        <p> <FontAwesomeIcon icon={faTimes} className={`absolute top-1 right-2 hover:bg-gray-200 rounded-[50%] flex items-center justify-center h-[22px] w-[22px] p-1 text-lg ${info?.type === "error" ? ' text-red-400' : ' text-blue-500'}  cursor-pointer`} onClick={closeErrorContainer} /></p>

                        <section className={`${info?.type === "error" ? 'text-red-400' : 'text-blue-500'} mt-[6px]`} >
                            {
                                info.message.startsWith("<") ? <div dangerouslySetInnerHTML={{ __html: info.message }} className="text-start pl-1" />
                                    : <div>{info.message}</div>
                            }
                        </section>
                    </motion.div>
                ) : null

            }
        </AnimatePresence>
    )
}

export default InfoContainer