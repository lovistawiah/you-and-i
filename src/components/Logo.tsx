import LogoImg from "../../public/logo.png";

const Logo = () => {
  return (
    <section className="w-fit rounded border-[0.4px] border-gray-300 p-1">
      <img
        src={LogoImg}
        alt="logo of you and I"
        className="h-[60px] w-[60px] md:h-[100px] md:w-[100px]"
      />
    </section>
  );
};

export default Logo;
