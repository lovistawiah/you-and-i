const FormButton = ({ btnText }) => {
    return (
        <button className='w-[200px] h-[33px] px-3.5 py-[7px] font-rale  bg-blue-600 rounded-[5px] border border-neutral-500 flex items-center justify-center text-white text-base font-normal hover:bg-blue-700 active:bg-blue-800 outline-none  md:w-[300px] md:text-lg '
        >{btnText}
        </button>
    )
}

export default FormButton