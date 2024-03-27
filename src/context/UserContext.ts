import { createContext } from "react";
import { IUser } from "../account/user";

interface UserContextType {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => null,
});
