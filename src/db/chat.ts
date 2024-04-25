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
  const chats = await db.getAll('chat') as Chat[]
  return chats.pop()
};

const clearChat = async () => {
  return (await chatDb()).clear("chat");
};

const addChat = async (value: Chat) => {
  await clearChat()
  const db = await chatDb()
  await db.add('chat', value, value.id)
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
