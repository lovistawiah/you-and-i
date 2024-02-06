const InputForm = ({ type, name, placeholder, id }) => {
    return (
        <div className="flex flex-col w-fit">
            <label htmlFor={id} className="text-gray-800 font-rale font-medium text-base">
                {placeholder}
            </label>
            <input type={type} name={name} className="w-[275px] h-[36px] py-[1px] pr-0 pl-[4px] rounded-[5px] bg-white border border-gray-500 text-base font-normal text-gray-700 outline-none md:w-[350px]  md:text-lg focus:border-blue-400 focus:border-[2px] font-rale" id={id} placeholder={placeholder} required />
        </div>
    )
}

export default InputForm