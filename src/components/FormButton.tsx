import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const FormButton = ({ btnText, spin, isValid }) => {
  return (
    <button
      className={`h-[33px] w-[200px] px-3.5 py-[7px] font-roboto ${!isValid ? "bg-red-500" : " bg-blue-500"} flex items-center justify-center rounded-[5px] border text-base text-white font-normal${isValid ? "bg-red-500" : "hover:bg-blue-600"} ${!isValid ? "bg-red-700" : " active:bg-blue-700"} outline-none  disabled:cursor-not-allowed md:w-[300px] md:text-lg`}
      disabled={spin || !isValid}
    >
      {spin ? (
        <>
          <FontAwesomeIcon icon={faCircleNotch} className="animate-spin" />{" "}
          <span className="pl-1">Processing...</span>
        </>
      ) : (
        <>{btnText}</>
      )}
    </button>
  );
};

export default FormButton;
