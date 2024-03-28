import { FormEvent, useEffect, useState } from "react";
import { IUser, signUp } from "../account/user";
import { addUser } from "../db/user";

export type infoObj = { type: "error" | "success"; message: string } | null;

const useRegister = () => {
  const [info, setInfo] = useState<infoObj>(null);
  const [spin, setSpin] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const saveUserInfoAndNavigate = async (userObj: IUser) => {
    setSpin(false);
    await addUser(userObj);
    location.href = location.origin + "/update-profile";
  };

  const errorLogger = ({ message }: { message: string }) => {
    setInfo({ type: "error", message });
    setSpin(false);
  };

  useEffect(() => {
    if (!isValid) {
      setInfo({
        type: "error",
        message: `<ul class="ml-1 text-sm md:text-base leading-normal">
                <li class="text-lg font-semibold">Password should:</li>
                  <li>At least contain 8 characters long</li>
                  <li>Contain at least one uppercase letter</li>
                  <li>Contain at least one lowercase letter</li>
                  <li>Contain at least one digit</li>
                  <li>Contain at least one special character (such as @$!%*?&,+><)</li>
                  </ul>`,
      });
    } else {
      setInfo(null);
    }
  }, [isValid]);

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSpin(true);
    const formData = new FormData(e.currentTarget);
    const formObj = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirm-password") as string,
    };

    try {
      const result = await signUp(formObj);

      if (!result) return;
      if ("userInfo" in result) {
        await saveUserInfoAndNavigate(result.userInfo);
      } else {
        errorLogger({ message: result.message });
      }
    } catch (err) {
      setInfo({ type: "error", message: "Unknown Error" });
    } finally {
      setSpin(false);
    }
  };

  return {
    errorLogger,
    spin,
    setIsValid,
    setSpin,
    isValid,
    handleForm,
    info,
    setInfo
  };
};

export default useRegister;
