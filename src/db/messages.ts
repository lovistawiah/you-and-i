import { db as MessagesDB } from ".";

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

export type IMessage = IBaseMessage & {
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

export type UpdateLastMessage = {
  chatId: string;
  lastMessage: string;
  msgDate: Date;
};

const addMessage = async (message: IMessage) => {
  const db = await MessagesDB();
  return await db.add("messages", message, message.id);
};
const updateMessage = async (message: IMessage) => {
  const db = await MessagesDB();
  await db.put("messages", message, message.id);
};

const getMessages = async () => {
  return (await MessagesDB()).getAll("messages");
};

const searchMessage = async (search: string) => {
  const db = await MessagesDB();
  const messages = await db.getAll("messages") as IMessage[]
  return messages.filter((message) => {
    return message.message.includes(search);
  });
};

const getMessage = async (id: string) => {
  return (await MessagesDB()).get("messages", id);
};
const clearMessages = async () => {
  return (await MessagesDB()).clear("messages");
};

// const updateLastMessage = async () => {
//     const tx = (await MessagesDB()).transaction('messages', 'readonly')
//     const store = tx.objectStore('messages')
//     const object = (await store.getAll()).pop()

// }

export {
  getMessages,
  getMessage,
  addMessage,
  searchMessage,
  updateMessage,
  clearMessages,
};
