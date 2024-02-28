import { Link } from "react-router-dom";
import { signUp } from "../account/user";
import InputForm from "./InputForm";
import WelcomeText from "./WelcomeText";
import FormButton from "./FormButton";
import InfoContainer from "./InfoContainer";
import Transition from "./Transition";
import Logo from "./Logo";
import ConfirmPassInput from "./ConfirmPass";
import PasswordInput from "./PasswordInput";
import useRegister from "../hooks/useRegister";
import React from "react";

const Register = () => {
  const {
    errorLogger,
    info,
    saveUserInfoAndNavigate,
    setInfo,
    setIsValid,
    spin,
    setSpin,
    isValid,
  } = useRegister();
  return (
    <Transition>
      <InfoContainer info={info} setInfo={setInfo} />
      <div
        className={`flex h-screen w-screen flex-col items-center justify-center gap-1 px-[6px] py-[20px]`}
      >
        <Logo />
        <WelcomeText />
        <form
          className="flex flex-col items-center gap-[21px]"
          onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setSpin(true);
            const formData = new FormData(e.target);
            const formObj = {
              username: formData.get("username"),
              email: formData.get("email"),
              password: formData.get("password"),
              confirmPassword: formData.get("confirm-password"),
            };
            //? return userInfo or error message if status > 200
            const result = await signUp(formObj);
            result.status != 200
              ? errorLogger({ message: result?.message })
              : saveUserInfoAndNavigate(result.userInfo);
          }}
        >
          <InputForm
            type={"email"}
            name={"email"}
            placeholder={"Email"}
            id={"email"}
          />
          <PasswordInput
            isValid={isValid}
            setIsValid={setIsValid}
            key={"password"}
            label={"New Password"}
          />
          <ConfirmPassInput />
          <FormButton
            btnText={"Create account"}
            isValid={isValid}
            spin={spin}
          />
        </form>
        <section className="inline-flex h-9 items-center justify-center gap-1 bg-white px-[31px] py-[9px] text-base md:text-lg">
          Have an Account?
          <Link
            to="/login"
            className="text-blue-600 hover:underline md:text-lg"
          >
            Login
          </Link>
        </section>
      </div>
    </Transition>
  );
};
export default Register;
