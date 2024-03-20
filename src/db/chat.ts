import { DBSchema, openDB } from 'idb'

export type Chat = {
    userId: string;
    id?: string;
    username: string;
    status?: string;
    avatarUrl: string;
    chatId?: string;
};

interface IChatDb extends DBSchema {
    chat: {
        key: string,
        value: Chat
    },
}
export type ChatDB = 'chat'

const chatDb = async () => {
    return await openDB<IChatDb>('you-and-i', 1, {
        upgrade(db) {
            db.createObjectStore('chat')
        }
    })
}

const getChat = async () => {
    const db = await chatDb()
    const tx = db.transaction('chat', 'readonly')
    const cursor = tx.objectStore('chat').openCursor()
    return await cursor;
}
const clearChat = async () => {
    return (await chatDb()).clear('chat')
}

const addChat = async (value: Chat) => {
    // using userId to add since userId is always available
    return (await chatDb()).add('chat', value, value.userId)
}


export { getChat, clearChat, addChat }