import { FormEvent, useContext, useState } from "react";
import { IUser, login } from "../account/user";
import { addToken, addUser, clearUsers } from "../db/user";
import { infoObj } from "./useRegister";
import { UserContext } from "../context/UserContext";

const useLogin = () => {
  const [info, setInfo] = useState<infoObj>(null);
  const [spin, setSpin] = useState(false);
  const { setUser } = useContext(UserContext)

  const saveUserInfoAndNavigate = async (userObj: IUser, token: string) => {
    setSpin(false);
    setUser(userObj)
    await clearUsers()
    await addUser(userObj);
    await addToken(token)
    location.href = location.origin + "/";
  };

  const errorLogger = ({ message }: { message: string }) => {
    setInfo({ type: "error", message });
    setSpin(false);
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSpin(true);
    const formData = new FormData(e.currentTarget);
    const obj = {
      usernameEmail: formData.get("username-email") as string,
      password: formData.get("password") as string,
    };
    const result = await login(obj);
    if (!result) return;
    "userInfo" in result
      ? await saveUserInfoAndNavigate(result.userInfo, result.token)
      : errorLogger({ message: result.message });
  };

  return {
    info,
    spin,
    setInfo,
    handleLogin,
  };
};
export default useLogin;
