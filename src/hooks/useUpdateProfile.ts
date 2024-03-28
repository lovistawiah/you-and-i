import { ChangeEvent, FormEvent, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IUser, updateUserInfo } from "../account/user.js";
import { getUser } from "../db/user";
import { UserContext } from "../context/UserContext.js";

const useUpdateProfile = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const { setUser } = useContext(UserContext)
  const [usernameInput, setUsernameInput] = useState("");
  const [, setInfo] = useState({});
  const navigate = useNavigate();
  const [personInfo, setPersonInfo] = useState<IUser>();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    getUser()
      .then((cursor) => {
        if (cursor?.value) {
          setPersonInfo(cursor.value);
        }
      })
      .catch((reason) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return reason;
      });
  }, []);

  useEffect(() => {
    if (personInfo) {
      setUser(personInfo)
    }
  }, [personInfo, setUser])


  const handleUserInfo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!personInfo) return;

    const formData = new FormData(e.currentTarget);
    const formObj = {
      username: formData.get("username") as string,
      id: personInfo.id,
    };

    if (formObj.username.length < 5) {
      setInfo({
        type: "error",
        message: "username should be 5 characters or more",
      });
      return;
    } else {
      const result = await updateUserInfo(formObj);
      if (!result) return;
      if ("userInfo" in result) {
        setPersonInfo({
          ...personInfo,
          username: result.userInfo.username,
        });

        location.href = location.origin + "/";
      } else {
        setInfo({
          type: "ok",
          message: result.message,
        });
      }
    }
  };

  const handleUsernameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUsernameInput(e.target.value);
  };

  const goBack = () => {
    navigate("/register");
  };

  const inputRegex = /^[a-zA-Z0-9.@_]*$/;

  return {
    windowWidth,
    handleUserInfo,
    personInfo,
    handleUsernameInput,
    usernameInput,
    goBack,
    inputRegex,
  };
};

export default useUpdateProfile;
