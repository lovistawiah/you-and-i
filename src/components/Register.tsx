import { Link } from "react-router-dom";
import { signUp } from "../account/user";
import InputForm from "./InputForm";
import WelcomeText from "./WelcomeText";
import FormButton from "./FormButton";
import InfoContainer from "./InfoContainer";
import Logo from "./Logo";
import ConfirmPassInput from "./ConfirmPass";
import PasswordInput from "./PasswordInput";
import useRegister from "../hooks/useRegister";
import { FormEvent } from "react";

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
  return (
    <div>
      <InfoContainer info={info} setInfo={setInfo} />
      <div
        className={`flex h-screen w-screen flex-col items-center justify-center gap-1 px-[6px] py-[20px]`}
      >
        <Logo />
        <WelcomeText />
        <form
          className="flex flex-col items-center gap-[21px]"
          onSubmit={handleForm}
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
    </div>
  );
};
export default Register;
