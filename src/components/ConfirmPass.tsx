import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

const ConfirmPassInput = () => {
  const [showPass, setShowPass] = useState(false);
  const passwordRef = useRef(null);
  const passVisibility = () => {
    setShowPass(!showPass);
  };
  return (
    <div className="flex w-fit flex-col">
      <label
        htmlFor="confirm-password"
        className="font-roboto text-base font-normal  text-gray-800"
      >
        Confirm Password
      </label>
      <div className="relative">
        <input
          ref={passwordRef}
          type={showPass ? "text" : "password"}
          name="confirm-password"
          className="h-[36px] w-[275px] rounded-[5px] border border-gray-500 bg-white py-[1px] pl-[4px] pr-0 font-roboto text-base font-normal text-gray-800 outline-none placeholder:text-gray-400  focus:border-[2px] focus:border-blue-400 md:w-[350px] md:text-lg"
          id="confirm-password"
          placeholder="Confirm Password"
          required
        />
        {
          <FontAwesomeIcon
            icon={showPass ? faEyeSlash : faEye}
            className="absolute right-2 top-[10px] text-gray-600"
            onClick={passVisibility}
          />
        }
      </div>
    </div>
  );
};

export default ConfirmPassInput;
