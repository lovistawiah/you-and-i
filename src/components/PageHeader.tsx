const PageHeader = ({ pageName }: { pageName: string }) => {
  return (
    <section className="fixed top-0 inline-flex h-[59px] w-full items-center justify-between bg-gray-50 px-[26px] py-[16px] md:relative md:top-[10px]">
      <section className="text-2xl  font-medium text-zinc-500 md:text-3xl lg:text-4xl">
        {pageName}
      </section>
    </section>
  );
};

export default PageHeader;
