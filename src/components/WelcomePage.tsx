import Logo from "../../public/logo.png";
import LinkText from "./LinkText";
const WelcomePage = ({ message }: { message: string }) => {
  return (
    <section className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <section className="flex h-[250px] w-[300px] flex-col items-center justify-center  rounded bg-gray-200 shadow-sm md:h-[300px] md:w-[500px] ">
        <img
          src={Logo}
          alt="logo"
          className="h-[60px] w-[60px] md:h-[100px] md:w-[100px] "
        />
        <h2 className="pt-3 font-roboto text-3xl font-bold">Welcome back,</h2>
        <p className="text-red-500">{message}</p>
        <section className=" flex w-full justify-evenly pt-5">
          <LinkText linkName={"Register"} />
          <LinkText linkName={"Login"} />
        </section>
      </section>
    </section>
  );
};

export default WelcomePage;
