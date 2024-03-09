import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const InputForm = ({
  type,
  name,
  placeholder,
  id,
}: {
  type: string;
  name: string;
  placeholder: string;
  id: string;
}) => {
  const [showPass, setShowPass] = useState(false);
  const passVisibility = () => {
    setShowPass(!showPass);
  };
  return (
    <div className="flex w-fit flex-col">
      <label
        htmlFor={id}
        className="font-roboto text-base font-normal  text-gray-800"
      >
        {placeholder}
      </label>
      <div className="relative">
        <input
          type={
            showPass && type.includes("password")
              ? "text"
              : type.includes("password") && !showPass
                ? "password"
                : "text"
          }
          name={name}
          className="h-[36px] w-[275px] rounded-[5px] border border-gray-500 bg-white py-[1px] pl-[4px] pr-0 font-roboto text-base font-normal text-gray-800 outline-none placeholder:text-gray-400  focus:border-[2px] focus:border-blue-400 md:w-[350px] md:text-lg"
          id={id}
          placeholder={placeholder}
          required
        />
        {type.includes("password") ? (
          <FontAwesomeIcon
            icon={showPass && type.includes("password") ? faEyeSlash : faEye}
            className="absolute right-2 top-[10px] text-gray-600"
            onClick={passVisibility}
          />
        ) : null}
      </div>
    </div>
  );
};

export default InputForm;
