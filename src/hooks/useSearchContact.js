import { useEffect, useState } from "react"
import { channelEvents } from "../utils/eventNames"
import { socket } from "../socket"

const useSearchContact = () =>{
    const [contacts,setContacts] = useState([])
    const [searchInput,setSearchInput] = useState('')
    
    useEffect(()=>{
    if(searchInput){
        const searchedContacts = (data)=>{
            setContacts(data)
        }
        socket.emit(channelEvents.search,searchInput)
        socket.on(channelEvents.search,searchedContacts)
    }else{
        const getContacts = (data)=>{
            setContacts(data)
        }
        socket.emit(channelEvents.contacts,{})
        socket.on(channelEvents.contacts,getContacts)
    }
    },[searchInput])

return {contacts,searchInput,setSearchInput}
}
export default useSearchContact