import { FormEvent, useState } from "react";
import { IUserInfo, login } from "../account/user";
import { addUser } from "../db/user";

const useLogin = () => {
  const [info, setInfo] = useState<{ type: string; message: string } | Record<string, never>>({});
  const [spin, setSpin] = useState(false);

  const saveUserInfoAndNavigate = async (userObj: IUserInfo) => {
    setSpin(false);

    await addUser(userObj);
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
      ? await saveUserInfoAndNavigate(result.userInfo)
      : errorLogger({ message: result.message });
  };

  return { info, spin, saveUserInfoAndNavigate, errorLogger, setInfo, setSpin, handleLogin };
};
export default useLogin;
