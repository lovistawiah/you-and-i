import { DBSchema, openDB } from 'idb'

export type ChatsValue = {
    id: string;
    userId: string;
    username: string;
    avatarUrl: string;
    lastMessage: string;
    lstMsgDate: Date;
};
interface IChatsDB extends DBSchema {
    chats: {
        key: string,
        value: ChatsValue
        indexes: { id: string }
    },
}
export type UpdateLastMessage = {
    chatId: string;
    lastMessage: string;
    msgDate: Date;
};

const chatsDb = async () => {
    return await openDB<IChatsDB>('you-and-i', 1, {
        upgrade(db) {
            const chat = db.createObjectStore('chats')
            chat.createIndex('id', 'id', {
                unique: true
            })
        }
    })
}
const updateChat = async (chat: ChatsValue) => {
    return (await chatsDb()).put('chats', chat, chat.id)
}
const addChat = async (chat: ChatsValue) => {
    return (await chatsDb()).add('chats', chat, chat.id)
}

const getChats = async () => {
    return (await chatsDb()).getAll('chats')
}

const searchChats = async (search: string) => {
    const chats = (await chatsDb()).getAll('chats')
    return (await chats).filter((chat) => {
        if (chat.username.toLowerCase().includes(search.toLowerCase())) {
            return chat
        }
    })
}

export { getChats, searchChats, addChat, updateChat }