import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserValue, setUserInfo } from "../app/userSlice";
import { updateUserInfo } from "../account/user.js";
import { State } from "../app/store";

const useUpdateProfile = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [usernameInput, setUsernameInput] = useState("");
  const user = useSelector((state: State) => state.user.value);
  const [info, setInfo] = useState({});
  const navigate = useNavigate();
  const [personInfo, setPersonInfo] = useState(user);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth]);

  const handleUserInfo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formObj = {
      username: formData.get("username") as string,
      id: personInfo?.id as string,
    };
    console.log(formData)
    if (!formObj.id) {
      setInfo({ type: "error", message: "Unknown error, try again" });
      return;
    }
    if (formObj.username.length < 5) {
      setInfo({
        type: "error",
        message: "username should be 5 characters or more",
      });
      return;
    }

    const result = await updateUserInfo(formObj);
    console.log(result)
    if (!result) return;
    if ("userInfo" in result) {
      setPersonInfo({
        ...(personInfo as UserValue),
        username: result.userInfo.username,
      });

      dispatch(
        setUserInfo({
          ...(personInfo as UserValue),
          username: result.userInfo.username,
        }),
      );
      location.href = location.origin + "/";
    } else {
      setInfo({
        type: "ok",
        message: result.message,
      });
    }
  };

  const handleUsernameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUsernameInput(e.target.value);
  };
  useEffect(() => {
    const handleLogout = () => {
      localStorage.clear();
    };
    handleLogout();
  }, []);

  const goBack = () => {
    navigate("/register");
  };

  const inputRegex = /^[a-zA-Z0-9.@_]*$/;

  return { windowWidth, handleUserInfo, info, setInfo, user, personInfo, navigate, handleUsernameInput, usernameInput, goBack, inputRegex };
};

export default useUpdateProfile;
