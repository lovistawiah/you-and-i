import { useEffect, useState } from "react"
import { socket } from "../socket"

const useMain = () => {
     const [errMsg, setErrMsg] = useState("")
      const [isToken, setToken] = useState(true)
      const [activePage, setActivePage] = useState(3)
          const [windowWidth, setWindowWidth] = useState(window.innerWidth)
          const [windowHeight,setWindowHeight] = useState(window.innerHeight)

        const pageSelector = (e) => {
        setActivePage(+e.target.id)
        }

        useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight)
        };

        window.addEventListener('resize', handleResize);
        return ()=>{
            window.removeEventListener('resize',handleResize)
        }
    }, [])
    
useEffect(() => {
        socket.on('connect_error', (data) => {
            if (data) {
                const message = data.message
                setErrMsg(message)
                setToken(false)
            } else {
                setToken(true)
            }
        })
        const handleConnect = () => {
            setToken(true)
        }
        socket.on("connect", handleConnect)
        return () => {
            socket.off('connect_error')
            socket.off('connect', handleConnect)
        }
    }, [])
    return {errMsg,isToken,windowWidth,activePage,pageSelector,windowHeight}
}

export default useMain