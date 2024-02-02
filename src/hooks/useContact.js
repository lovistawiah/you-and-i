import { useEffect, useState } from "react"
import { chatEvents } from "../utils/eventNames"
import { socket } from "../socket"
import {useDispatch} from "react-redux"
import {searchContacts,updateContact} from "../app/contacts"
const useContact = () =>{

    const [searchInput,setSearchInput] = useState('')
    const dispatch = useDispatch()
    useEffect(()=>{
            dispatch(searchContacts(searchInput))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchInput])

    useEffect(()=>{
        const getChats = (data) => {
            dispatch(updateContact(data)) //data is {_id,username,avatarUrl}
        };

        socket.emit(chatEvents.oldnNewChats,{})
        socket.on(chatEvents.oldnNewChats,getChats)
    return ()=>{
        socket.off(chatEvents.oldnNewChats,getChats)
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

return {searchInput,setSearchInput}
}
export default useContact