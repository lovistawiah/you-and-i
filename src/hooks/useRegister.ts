import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../app/userSlice";
import { UserInfo, signUp } from "../account/user";


const useRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [info, setInfo] = useState({});
  const [spin, setSpin] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const saveUserInfoAndNavigate = (userObj: UserInfo) => {
    setSpin(false);
    dispatch(setUserInfo(userObj));
    navigate("/update-profile");
  };

  const errorLogger = ({ message }: { message: string }) => {
    setInfo({ type: "error", message });
    setSpin(false);
  };

  useEffect(() => {
    const handleLogout = () => {
      localStorage.clear();
    };
    handleLogout();
  }, []);

  useEffect(() => {
    if (!isValid) {
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
        saveUserInfoAndNavigate(result.userInfo);
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
    info,
    saveUserInfoAndNavigate,
    errorLogger,
    setInfo,
    spin,
    setIsValid,
    setSpin,
    isValid,
    handleForm
  };
};

export default useRegister;
