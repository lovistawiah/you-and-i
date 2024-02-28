import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../app/userSlice";
import { updateUserInfo } from "../account/User.js";
import { State } from "../interface/state";

const useUpdateProfile = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const user = useSelector((state: State) => state.user.value);
  const [info, setInfo] = useState({});

  const [personInfo, setPersonInfo] = useState(user);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth]);

  const handleUserInfo = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = {
      username: formData.get("username"),
      userId: personInfo?.userId,
    };
    if (!formObj.userId) {
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

    const userObj = await updateUserInfo(formObj);
    if (userObj.status === 200) {
      setPersonInfo({
        ...personInfo,
        username: userObj.userInfo.username,
      });

      dispatch(
        setUserInfo({
          ...personInfo,
          username: userObj.userInfo.username,
        }),
      );
      location.href = location.origin + "/";
    } else {
      setInfo({
        type: "ok",
        message: userObj.message,
      });
    }
  };
  return { windowWidth, handleUserInfo, info, setInfo, user, personInfo };
};

export default useUpdateProfile;
