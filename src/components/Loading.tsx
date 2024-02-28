import Logo from "../../public/logo.png";
const Loading = () => {
  return (
    <section className={`flex h-screen w-screen items-center justify-center`}>
      <img src={Logo} alt="" className="animate-bounce" />
    </section>
  );
};

export default Loading;
