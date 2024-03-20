import { DBSchema, openDB } from "idb";

export type Contact = {
    id: string;
    username: string;
    avatarUrl: string;
    chatId?: string;
    bio: string;
    status?: string;
};


interface IContactDB extends DBSchema {
    contacts: {
        key: string,
        value: Contact
        indexes: { id: string }
    }
}
const contactDb = async () => {
    return await openDB<IContactDB>('you-and-i', 1, {
        upgrade(db) {
            const contact = db.createObjectStore('contacts')
            contact.createIndex('id', 'id', {
                unique: true
            })

        }
    })
}

const getContacts = async () => {
    const db = await contactDb()
    return await db.getAll('contacts')
}
const addContact = async (value: Contact) => {
    const db = await contactDb()
    return await db.add('contacts', value, value.id)
}

const updateContact = async (value: Contact) => {
    const db = await contactDb()
    return await db.put('contacts', value, value.id)
}

const clearContacts = async () => {
    return (await contactDb()).clear('contacts')
}

const searchContacts = async (search: string) => {
    const db = await contactDb()
    const contacts = await db.getAll('contacts')
    return contacts.filter(contact => {
        if (contact.username.toLowerCase().includes(search.toLowerCase())) {
            return contact
        }
    })
}
export { getContacts, addContact, clearContacts, searchContacts, updateContact }