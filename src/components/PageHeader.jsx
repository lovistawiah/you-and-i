const PageHeader = ({ pageName }) => {
  return (
    <section className="w-full h-[59px] px-[26px] py-[16px] fixed bg-gray-50 justify-between items-center inline-flex top-0">
      <section className="text-zinc-500  font-medium text-2xl">{pageName}</section>
    </section>
  )
}

export default PageHeader