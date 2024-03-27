import { Link } from "react-router-dom";
import InputForm from "./InputForm";
import WelcomeText from "./WelcomeText";
import FormButton from "./FormButton";
import Logo from "./Logo";
import ConfirmPassInput from "./ConfirmPass";
import useRegister from "../hooks/useRegister";
import PassWithRegex from "./PassWithRegex";

const Register = () => {
  const { setIsValid, spin, handleForm, isValid } = useRegister();
  return (
    <div
      className={`flex h-screen w-screen flex-col items-center justify-center gap-1 px-[6px] py-[20px]`}
    >
      <Logo />
      <WelcomeText />

      <form className="flex flex-col items-center gap-[21px]" onSubmit={handleForm}>
        <InputForm type={"email"} name={"email"} placeholder={"Email"} id={"email"} />
        <PassWithRegex isValid={isValid} setIsValid={setIsValid} />
        <ConfirmPassInput />
        <FormButton btnText={"Create account"} isValid={isValid} spin={spin} />
      </form>

      <section className="inline-flex h-9 items-center justify-center gap-1 bg-white px-[31px] py-[9px] text-base md:text-lg">
        Have an Account?
        <Link to="/login" className="text-blue-600 hover:underline md:text-lg">
          Login
        </Link>
      </section>
    </div>
  );
};
export default Register;
