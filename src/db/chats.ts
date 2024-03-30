import { db as chatsDb, ChatsValue } from ".";

const updateChat = async (chat: ChatsValue) => {
  return (await chatsDb()).put("chats", chat, chat.id);
};
const addChat = async (chat: ChatsValue) => {
  return (await chatsDb()).add("chats", chat, chat.id);
};

const getChats = async () => {
  return (await chatsDb()).getAll("chats");
};

const searchChats = async (search: string) => {
  const db = await chatsDb()
  const chats = await db.getAll('chats') as ChatsValue[]
  return chats.filter((chat) => {
    if (chat.username.toLowerCase().includes(search.toLowerCase())) {
      return chat;
    }
  });
};

export { getChats, searchChats, addChat, updateChat };
