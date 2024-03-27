import { Link } from "react-router-dom";
import WelcomeText from "./WelcomeText";
import InputForm from "./InputForm";
import Logo from "./Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const { spin, handleLogin } = useLogin();

  return (
    <div>
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 px-[6px] py-[23px]">
        <Logo />
        <WelcomeText />
        <form
          className="flex flex-col items-center gap-[21px]"
          onSubmit={handleLogin}
        >
          <InputForm
            name={"username-email"}
            type={"text"}
            placeholder={"Username or Email"}
            id={"username-email"}
          />
          <InputForm
            name={"password"}
            placeholder={"Password"}
            id={"password"}
            type={"password"}
          />
          <button
            className={`flex h-[33px] w-[200px] items-center justify-center rounded-[5px] border bg-blue-500 px-3.5 py-[7px] font-roboto text-base font-normal text-white  outline-none hover:bg-blue-600 active:bg-blue-700  disabled:cursor-not-allowed md:w-[300px] md:text-lg`}
            disabled={spin}
          >
            {spin ? (
              <>
                <FontAwesomeIcon
                  icon={faCircleNotch}
                  className="animate-spin"
                />{" "}
                <span className="pl-1">Processing...</span>
              </>
            ) : (
              <>Login</>
            )}
          </button>
        </form>
        <section className="inline-flex h-9 items-center justify-center gap-1 bg-white px-[31px] py-[9px] text-base md:text-lg">
          New Account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Login;
