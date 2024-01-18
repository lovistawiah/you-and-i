import { useEffect, useState } from 'react'
import { socket } from '../socket'
import { channelEvents } from '../utils/eventNames'
import Search from './Search'
import PageHeader from './PageHeader'



const NewContacts = () => {
    const [newContacts, setNewContacts] = useState([])

    useEffect(() => {
        const getChatData = (newContactsData) => {
            console.log(newContactsData)
            if (Array.isArray(newContactsData)) {
                setNewContacts(newContactsData)
            }
        }
        // change to listen on new contacts
        socket.on(channelEvents.contacts, getChatData)
        return () => {
            socket.off(channelEvents.channelAndLastMessage)
        }
    }, [])
    console.log(newContacts)
    return (

        <>
            <Search />
            <PageHeader pageName={"Contacts"} />
            <section>
                {/* get new contacts info from faker first */}
            </section>
        </>
    )
}
export default NewContacts