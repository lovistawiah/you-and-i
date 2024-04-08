import { FormEvent, useContext, useEffect, useState } from "react";
import { IUser, signUp } from "../account/user";
import { addUser, clearUsers } from "../db/user";
import { UserContext } from "../context/UserContext";


export type infoObj = { type: "error" | "success"; message: string } | null;

const useRegister = () => {
  const [info, setInfo] = useState<infoObj>(null);
  const [spin, setSpin] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const { setUser } = useContext(UserContext)

  const saveUserInfoAndNavigate = async (userObj: IUser) => {
    setSpin(false);
    await clearUsers()
    await addUser(userObj);
    setUser(userObj)
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
        message:
          `<div>
        <h3 class="text-lg font-semibold">Password should:</h3>
        <ul class="ml-1 text-sm md:text-base leading-normal">
          <li>At least contain <strong>8 characters</strong> long</li>
          <li>Contain at least <strong>one uppercase</strong> letter</li>
          <li>Contain at least <strong>one lowercase</strong> letter</li>
          <li>Contain at least <strong>one digit</strong></li>
          <li>Contain at least <strong>one special character</strong> such as <strong> @$!%*?&,+>< </strong> </li>
        </ul>
        </div>
        `,
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
