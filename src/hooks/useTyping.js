
import { usrEvents } from '../utils/eventNames'
import { socket } from '../socket'
import { useEffect, useState } from 'react'

const useTyping = () => {
  const [isTypingObj,setIsTypingObj] = useState(null)
  
    useEffect(() => {
        let noDataTimeout;
        function startNoDataTimer() {
            noDataTimeout = setTimeout(() => {
                setIsTypingObj(null)
            }, 1400)
        }
        socket.on(usrEvents.typing, (data) => {
            const { chatId } = data
            if (chatId) {
                clearTimeout(noDataTimeout)
                setIsTypingObj(data)
            }
            startNoDataTimer()
        })
        return () => {
            socket.off(usrEvents.typing)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    })
    return {isTypingObj}
}

export default useTyping