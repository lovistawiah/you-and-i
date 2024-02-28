const WelcomeText = () => {
  return (
    <section className="mb-1 inline-flex h-[98px] w-[291px] flex-col items-center justify-start py-2 md:mb-6">
      <span className="text-[24px] font-normal text-black md:text-[32px] ">
        Welcome to,
      </span>
      <div className="inline-flex h-[47px] w-[291px] items-center justify-end gap-[27px] px-[37px]">
        <span className="text-center text-[32px] font-normal text-blue-500 md:text-[48px] ">
          {" "}
          You and I{" "}
        </span>
      </div>
    </section>
  );
};

export default WelcomeText;
