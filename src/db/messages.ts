import { DBSchema, openDB } from 'idb'

type MessageInfo = "created" | "updated" | "deleted"; 7
export interface IBaseMessage {
    id: string;
    message: string;
    sender: string;
    updatedAt: Date;
    createdAt: Date;
    chatId: string;
    info: MessageInfo;
}
type Reply = {
    id: string;
    message: string;
    sender: string;
    info: MessageInfo;
};
export interface IMessage extends IBaseMessage {
    reply?: Reply;
}

export type NewChatAndMessage = {
    newChat: {
        id: string;
        userId: string;
        username: string;
        avatarUrl: string;
        bio: string;
        status: string;
    };
    msgObj: IMessage;
};

export type MessageProps = {
    message: string;
    sender: string;
    msgDate: string | Date;
    userId: string;
    id: string;
    info: MessageInfo;
    reply?: Reply;
};

interface IMessageDB extends DBSchema {
    messages: {
        key: string,
        value: IMessage
        indexes: { id: string }
    },
}

const MessagesDB = async () => {
    return await openDB<IMessageDB>('you-and-i', 1, {
        upgrade(db) {
            const messages = db.createObjectStore('messages')
            messages.createIndex('id', 'id')
        }
    })
}

const addMessage = async (message: IMessage) => {
    const db = await MessagesDB()
    return await db.add('messages', message, message.id)
}
const updateMessage = async (message: IMessage) => {
    const db = await MessagesDB()
    await db.put('messages', message, message.id)
}

const getMessages = async () => {
    return (await MessagesDB()).getAll('messages')
}

const searchMessage = async (search: string) => {
    const db = await MessagesDB()
    const messages = db.getAll('messages')

    return (await messages).filter(message => {
        return message.message.includes(search)
    })
}

const getMessage = async (id: string) => {
    return ((await MessagesDB()).get('messages', id))
}
const clearMessages = async () => {
    return (await MessagesDB()).clear('messages')
}

export { getMessages, getMessage, addMessage, searchMessage, updateMessage, clearMessages }