import { useEffect, useState } from "react"
import { chatEvents } from "../utils/eventNames"
import { socket } from "../socket"

const useSearchContact = () =>{
    const [chats,setChats] = useState([])
    const [searchInput,setSearchInput] = useState('')
    
    useEffect(()=>{
    if(searchInput){
        const searchedChats = (data)=>{
               setChats((prev)=> {
               if(prev.reduce((prevValue)=>))
               })
        }
        socket.emit(chatEvents.search,searchInput)
        socket.on(chatEvents.search,searchedChats)
    }else{
        const getChats = (data)=>{
            setChats((prev)=> [...prev,data])
        }
        socket.emit(chatEvents.oldnNewChats,{})
        socket.on(chatEvents.oldnNewChats,getChats)
    }
    return ()=>{
        socket.off(chatEvents.search)
        socket.off(chatEvents.chats)
    }
    },[searchInput])

return {chats,searchInput,setSearchInput}
}
export default useSearchContact