import { DBSchema, openDB, } from 'idb'
import { IUserValue } from '../app/userSlice'

interface IUserDB extends DBSchema {
    user: {
        key: string,
        value: IUserValue
        indexes: { id: string }
    },
    token: {
        key: string,
        value: string
    }
}
export type UserDB = 'user' | 'token'

const userDb = async () => {
    return await openDB<IUserDB>('you-and-i', 1, {
        upgrade(db) {
            const user = db.createObjectStore("user")
            user.createIndex('id', 'id', {
                unique: true,
            })
            db.createObjectStore('token')
        }
    })
}

const getUser = async () => {
    const db = await userDb()
    const tx = db.transaction('user', 'readonly')
    const cursor = tx.objectStore('user').openCursor()
    return await cursor;
}


const deleteUser = async (id: string) => {
    return (await userDb()).delete('user', id)
}

const clearUsers = async () => {
    return (await userDb()).clear('user')
}

const addUser = async (value: IUserValue) => {
    await clearUsers()
    const db = await userDb()
    return await db.add('user', value, value.id)
}

const addToken = async (token: string) => {
    const db = await userDb()
    return await db.add('token', token)
}
const removeToken = async () => {
    const db = await userDb()
    return await db.clear('token')
}
const getToken = async () => {
    const db = await userDb()
    console.log(await db.get('token', 'token'))
}

export { getUser, addUser, deleteUser, clearUsers, addToken, removeToken, getToken }