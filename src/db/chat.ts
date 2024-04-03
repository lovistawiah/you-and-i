import { db as chatDb } from '.'

export type Chat = {
  userId: string;
  id?: string;
  username: string;
  status?: string;
  avatarUrl: string;
  chatId?: string;
};
export interface IChatInfo {
  userId: string;
  avatarUrl: string;
  username: string;
  status?: string;
  chatId?: string;
}

const getChat = async () => {
  const db = await chatDb();
  const tx = db.transaction("chat", "readonly");
  const cursor = tx.objectStore("chat").openCursor();
  return await cursor;
};
const clearChat = async () => {
  return (await chatDb()).clear("chat");
};

const addChat = async (value: Chat) => {
  // using userId to add since userId is always available
  return (await chatDb()).add("chat", value, value.userId);
};

const updateStatus = async (value: {
  userId: string;
  status: Date | string;
}) => {
  const tx = (await chatDb()).transaction("chat", "readwrite");
  const store = tx.objectStore("chat");
  const chat = await store.get(value.userId) as Chat;
  const updateChat = {
    ...chat,
    value,
  };
  await store.put(updateChat, updateChat.userId);
};

export { getChat, clearChat, addChat, updateStatus };
