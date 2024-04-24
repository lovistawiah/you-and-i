import { ChangeEvent, FormEvent, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IUser, updateUserInfo } from "../account/user.js";
import { updateUser } from "../db/user";
import { UserContext } from "../context/UserContext.js";
import { infoObj } from "./useRegister.js";

const useUpdateProfile = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const { setUser } = useContext(UserContext)
  const [usernameInput, setUsernameInput] = useState("");
  const [info, setInfo] = useState<infoObj>(null);
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
    const updateData = async () => {
      if (personInfo) {
        await updateUser(personInfo)
      }
    }
    void updateData()
  }, [personInfo])

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
          type: 'success',
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
    info,
    setInfo,
    inputRegex,
  };
};

export default useUpdateProfile;
