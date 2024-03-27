import { DBSchema, openDB } from "idb";
import { IUser } from "../account/user";
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

const userDb = async () => {
  return await openDB<IUserDB>("you-and-i", 1, {
    upgrade(db) {
      const user = db.createObjectStore("user");
      user.createIndex("id", "id", {
        unique: true,
      });
      db.createObjectStore("token", {
        autoIncrement: true,
      });
    },
  });
};

const getUser = async () => {
  const db = await userDb();
  const tx = db.transaction("user", "readonly");
  const cursor = tx.objectStore("user").openCursor();
  return await cursor;
};

const deleteUser = async (id: string) => {
  return (await userDb()).delete("user", id);
};

const clearUsers = async () => {
  return (await userDb()).clear("user");
};

const addUser = async (value: IUser) => {
  await clearUsers();
  const db = await userDb();
  return await db.add("user", value, value.id);
};
const removeToken = async () => {
  const db = await userDb();
  return await db.clear("token");
};
const getToken = async () => {
  const db = await userDb();
  return await db.get("token", "token");
};

const addToken = async (token: string) => {
  await removeToken();
  const db = await userDb();
  return await db.add("token", token, "token");
};

export {
  getUser,
  addUser,
  deleteUser,
  clearUsers,
  addToken,
  removeToken,
  getToken,
};
