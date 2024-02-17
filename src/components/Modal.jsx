import { useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

const Modal = ({ children }) => {
    const elRef = useRef(null)
    if (!elRef.current) {
        elRef.current = document.createElement('div')
    }
    useEffect(() => {
        const modalRoot = document.getElementById('messages')
        modalRoot.appendChild(elRef.current)
        return () => {
            modalRoot.removeChild(elRef.current)
        }
    }, [])
    return createPortal(<div className='absolute bottom-0 left-2 right-2 rounded border border-gray-400 shadow bg-white/50'>
        {children}
    </div>, elRef.current)
}
// emit the reply to server 
// when reply message is set hide the reply button. let reply and update use the same modal
// message ops on the message either reply or update.

export default Modal