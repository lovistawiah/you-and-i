const PageHeader = ({ pageName }) => {
  return (
    <section className="h-[59px] px-[26px] py-[16px] fixed bg-gray-50 justify-between items-center inline-flex top-0 w-full md:top-[20px] md:relative">
      <section className="text-zinc-500  font-medium text-2xl md:text-3xl lg:text-4xl">{pageName}</section>
    </section>
  )
}

export default PageHeader