import { DBSchema, openDB } from "idb";
import { IUser } from "../account/user";
import { ChatsValue } from "./chats";
import { Contact } from "./contact";
import { IMessage } from "./messages";

interface IUserDB extends DBSchema {
    user: {
        key: string;
        value: IUser;
        indexes: { id: string };
    };
    token: {
        key: string;
        value: string;
    };
}
interface IChatsDB extends DBSchema {
    chats: {
        key: string;
        value: ChatsValue;
        indexes: { id: string };
    };
}

interface IContactDB extends DBSchema {
    contacts: {
        key: string;
        value: Contact;
        indexes: { id: string };
    };
}



interface IMessageDB extends DBSchema {
    messages: {
        key: string;
        value: IMessage;
        indexes: { id: string };
    };
}

type IDB = IUserDB | IContactDB | IMessageDB | IChatsDB

export const db = async () => {
    return await openDB<IDB>("you-and-i", 1, {
        upgrade(db) {

            //contacts
            const contact = db.createObjectStore("contacts", { keyPath: 'id' });
            contact.createIndex("id", "id", {
                unique: true,
            });
            // user
            const user = db.createObjectStore("user", { keyPath: 'id' });
            user.createIndex("id", "id", {
                unique: true,
            });

            // token
            db.createObjectStore("token", {
                autoIncrement: true,
            });

            //chats
            const chats = db.createObjectStore("chats");
            chats.createIndex("id", "id", {
                unique: true,
            });

            //messages
            const messages = db.createObjectStore("messages", { keyPath: 'id' });
            messages.createIndex("id", "id");
        },
    });
};