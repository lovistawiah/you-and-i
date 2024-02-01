import { useEffect, useState } from "react"
import { chatEvents } from "../utils/eventNames"
import { socket } from "../socket"

const useSearchContact = () =>{
    const [contacts,setContacts] = useState([])
    const [searchInput,setSearchInput] = useState('')
    
    useEffect(()=>{
    if(searchInput){
        const searchedContacts = (data)=>{
            setContacts(data)
        }
        socket.emit(chatEvents.search,searchInput)
        socket.on(chatEvents.search,searchedContacts)
    }else{
        const getContacts = (data)=>{
            setContacts(data)
        }
        socket.emit(chatEvents.oldnNewChats,{})
        socket.on(chatEvents.oldnNewChats,getContacts)
    }
    return ()=>{
        socket.off(chatEvents.search)
        socket.off(chatEvents.contacts)
    }
    },[searchInput])

return {contacts,searchInput,setSearchInput}
}
export default useSearchContact