const InputForm = ({ type, name, placeholder, id }) => {
    return (
        <input type={type} name={name} className="w-[275px] h-[36px] py-[1px] pr-0 pl-[4px] rounded-[5px] bg-white border border-zinc-500 text-base font-normal text-neutral-700 active:border-zinc-800 outline-none md:w-[400px]  md:text-lg " id={id} placeholder={placeholder} required />
    )
}

export default InputForm