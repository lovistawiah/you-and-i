import { IMessage, db as MessagesDB } from ".";

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
