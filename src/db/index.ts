import { DBSchema, openDB } from "idb";
import { IUser } from "../account/user";

export interface IUserDB extends DBSchema {
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

export type Contact = {
    id: string;
    username: string;
    avatarUrl: string;
    chatId?: string;
    bio: string;
    status?: string;
};

export interface IContactDB extends DBSchema {
    contacts: {
        key: string;
        value: Contact;
        indexes: { id: string };
    };
}

type MessageInfo = "created" | "updated" | "deleted";

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
    userId: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    id: string;
    info: MessageInfo;
    reply?: Reply;
};

interface IMessageDB extends DBSchema {
    messages: {
        key: string;
        value: IMessage;
        indexes: { id: string };
    };
}

type IDB = IUserDB | IContactDB | IMessageDB

export const db = async () => {
    return await openDB<IDB>("you-and-i", 1, {
        upgrade(db) {
            const contact = db.createObjectStore("contacts", { keyPath: 'id' });
            contact.createIndex("id", "id", {
                unique: true,
            });

            const user = db.createObjectStore("user", { keyPath: 'id' });
            user.createIndex("id", "id", {
                unique: true,
            });

            db.createObjectStore("token", {
                autoIncrement: true,
            });

            const messages = db.createObjectStore("messages", { keyPath: 'id' });
            messages.createIndex("id", "id");
        },
    });
};