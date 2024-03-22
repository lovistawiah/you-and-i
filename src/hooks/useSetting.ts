import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { userSettings } from "../account/user";
import { IUserValue } from "../app/userSlice";
import { getUser } from "../db/user";

const useSetting = () => {
  const [isPassValid, setIsPassValid] = useState(true);
  const [info, setInfo] = useState({});
  const [usernameInput, setUsernameInput] = useState("");
  const [userInfo, setUserInfo] = useState<IUserValue>();

  const handleUsernameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUsernameInput(e.currentTarget.value);
  };
  const inputRegex = /^[a-zA-Z0-9.@_]*$/;

  useEffect(() => {
    if (!isPassValid) {
      setInfo({
        type: "error",
        message: `<ul>
                <li class="text-lg mb-1 text-red-500">Password should:</li>
                  <li>At least contain 8 characters long</li>
                  <li>Contain at least one uppercase letter</li>
                  <li>Contain at least one lowercase letter</li>
                  <li>Contain at least one digit</li>
                  <li>Contain at least one special character (such as @$!%*?&,+><)</li>
                  </ul>`,
      });
    } else {
      setInfo({});
    }
  }, [isPassValid]);

  useEffect(() => {
    getUser()
      .then((cursor) => {
        if (cursor?.value) {
          setUserInfo(cursor.value);
        }
      })
      .catch((reason) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return reason;
      });
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const bio = formData.get("bio") as string;
    const currentPassword = formData.get("password") as string;
    const newPassword = formData.get("new-password") as string;
    const confirmPassword = formData.get("confirm-password") as string;
    const userObj = {
      id: userInfo?.id ?? "",
      username,
      bio,
      currentPassword,
      newPassword,
      confirmPassword,
    };
    const result = await userSettings(userObj);
    if (!result) return;
    if ("userInfo" in result) {
      setInfo({
        type: "ok",
        message: result.message,
      });
    } else {
      setInfo({ type: "error", message: result.message });
    }
  };
  const handleLogout = () => {
    localStorage.clear();
    location.href = location.origin + "/";
  };
  return {
    handleLogout,
    handleSubmit,
    inputRegex,
    handleUsernameInput,
    usernameInput,
    setUsernameInput,
    isPassValid,
    setIsPassValid,
    userInfo,
    info,
  };
};

export default useSetting;
