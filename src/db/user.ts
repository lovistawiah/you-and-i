import { db as userDb } from ".";
import { IUser } from "../account/user";

const getUser = async () => {
  const db = await userDb();
  const users = await db.getAll('user') as IUser[]
  return users.pop()
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
  return await db.get("token", "token") as string;
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
