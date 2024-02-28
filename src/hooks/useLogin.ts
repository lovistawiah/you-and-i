import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../app/userSlice";
const useLogin = () => {
  const [info, setInfo] = useState({});
  const [spin, setSpin] = useState(false);
  const dispatch = useDispatch();

  const saveUserInfoAndNavigate = (userObj) => {
    if (!userObj) return;
    setSpin(false);
    dispatch(setUserInfo(userObj));
    location.href = location.origin + "/";
  };
  const errorLogger = ({ message }) => {
    setInfo({ type: "error", message });
    setSpin(false);
  };

  useEffect(() => {
    localStorage.clear();
  }, []);
  return { info, spin, saveUserInfoAndNavigate, errorLogger, setInfo, setSpin };
};

export default useLogin;
