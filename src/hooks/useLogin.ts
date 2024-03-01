import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../app/userSlice";
import { UserInfo } from "../interface/account/user";
const useLogin = () => {
  const [info, setInfo] = useState({});
  const [spin, setSpin] = useState(false);
  const dispatch = useDispatch();

  const saveUserInfoAndNavigate = (userObj: UserInfo) => {
    if (!userObj) return;
    setSpin(false);
    dispatch(setUserInfo(userObj));
    location.href = location.origin + "/";
  };
  const errorLogger = ({ message }: { message: string }) => {
    setInfo({ type: "error", message });
    setSpin(false);
  };

  useEffect(() => {
    localStorage.clear();
  }, []);
  return { info, spin, saveUserInfoAndNavigate, errorLogger, setInfo, setSpin };
};

export default useLogin;
